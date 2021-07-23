import { MetadataField } from "./modal/MetadataField";
import { ElasticQueryBuilder } from "./modal/elastic-query-builder";

export default class Elastic {
  constructor(metadataFields) {
    this.elasticQuery = new ElasticQueryBuilder();
    this.metadataFields = metadataFields;
    this.searchResults=null;
    this.aggregationResults=[];
    this.initializeElasticFromMetadata = this.initializeElasticFromMetadata.bind(
      this
    );
    this.getElasticQuery = this.getElasticQuery.bind(this);
    this.initializeElasticFromSearch = this.initializeElasticFromSearch.bind(
      this
    );
    this.populateAggregationFields = this.populateAggregationFields.bind(this);
    this.appendCheckedSelectionFilters = this.appendCheckedSelectionFilters.bind(this);
    this.mergeAggregations = this.mergeAggregations.bind(this);
    this.initializeElasticFromMetadata();
  }
  getElasticQuery() {
    return this.elasticQuery;
  }

  appendCheckedSelectionFilters(){
    if(this.elasticQuery){
      this.elasticQuery.prepareQuery();
      this.elasticQuery.query.bool.must=[];
    }
    if(this.aggregationResults){
      this.aggregationResults.forEach(aggregation=>{
          if(aggregation.field && aggregation.values){
            aggregation.values.forEach(value=>{
              if(value.checked){
              const metadataField = new MetadataField(aggregation.field);
              this.elasticQuery.query.bool.must.push(metadataField.getFilterQueryObject(value.key));
              }
            });
          }
      });
    }
  }

  initializeElasticFromMetadata() {
    this.metadataFields.forEach(element => {
      const metadataField = new MetadataField(element);
      this.elasticQuery._source.push(metadataField.field_name);
      this.elasticQuery.collection = metadataField.collection;
      if (metadataField.facet_ind && metadataField.facet_ind === "true") {
        this.elasticQuery.aggs[
          metadataField.field_name
        ] = metadataField.getAggregationObject();
      }
    });
  }

  initializeElasticFromSearch(data) {
    if (data && data.responseDocuments.length > 0) {
      this.searchResults = this.changeKeys(data.responseDocuments);
      this.elasticQuery.total = data.total;
    }
    if (data && data.responseAggregations.length > 0) {
      this.mergeAggregations(data.responseAggregations);
    }
  }

  populateAggregationFields() {
    if (this.aggregationResults) {
      this.aggregationResults.forEach(el => {
        el.field = this.metadataFields.find(f => el.name === f.field_name);
        if (el.field.field_type === "RANGE") {
          el.values.forEach((v, i) => {
            if (el.field.range_label && el.field.range_label[i]) {
              v.displayLabel = el.field.range_label[i];
            }
          });
        }
      });
    }
  }

 setTextQuery(queryText){
   this.elasticQuery.queryText=queryText;
 }


  mergeAggregations(newAggregations) {
    if (this.aggregationResults && newAggregations) {
      const mergedAggregations = [];
      newAggregations.forEach(element => {
        let newAggregationResult = element;
        const existingAggregationResult = this.aggregationResults.filter(
          X => X.name === element.name
        )[0];
        if (existingAggregationResult) {
          const existingAggregationChecekd = existingAggregationResult.values.filter(
            f => f.checked
          )[0];
          if (existingAggregationChecekd) {
            newAggregationResult = existingAggregationResult;
          }
        }
        mergedAggregations.push(newAggregationResult);
      });
      this.aggregationResults = mergedAggregations;
    } else {
      this.aggregationResults = newAggregations;
    }
    this.populateAggregationFields();
  }

  changeKeys(responseDocuments) {
    if (this.metadataFields && responseDocuments) {
      let newResponseDocuments = [];
      responseDocuments.forEach(responseDocument => {
        let newResponseDocument = {};
        for (let key of Object.keys(responseDocument)) {
          let metadataField = this.metadataFields.find(
            f => f.field_name === key
          );
          if (metadataField) {
            newResponseDocument.key = metadataField.display_label;
            newResponseDocument[metadataField.display_label] =
              responseDocument[key];
          } else {
            newResponseDocument.key = key;
            newResponseDocument[key] = responseDocument[key];
          }
        }
        newResponseDocuments.push(newResponseDocument);
      });
      return newResponseDocuments;
    }
    return responseDocuments;
  }

}
