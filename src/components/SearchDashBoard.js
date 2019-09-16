import React, { useState, useEffect } from "react";
import Elastic from "../utils/context/Elastic";
import ElasticResponse from "./../utils/context/modal/elastic-response";
import ElasticAggregationField from "./../utils/context/modal/elastic-aggregation-field";
import ElasticAggregationResult from "./../utils/context/modal/elastic-aggregation-item";
import ElasticContext from "./../utils/context/ElasticContext";

export default function SearchDashBoard(props) {
  const [elasticContext, setElasticContext] = useState({
    elastic: new Elastic(props.metadataFields)
  });

  const [changedSelection, setChangedSelection] = useState(false);

  useEffect(() => {
    performSearch();
  }, []);

 /* const updateElasticContext = elastic => {
    setElasticContext(prevElasticContext => {
      const mergedContext = { ...prevElasticContext.elastic, ...elastic };
      return {elastic: mergedContext };
    });
  };*/

  


  const performSearch=()=>{
    elasticContext.elastic.appendCheckedSelectionFilters();
    let queryObj = elasticContext.elastic.getElasticQuery();
    const url =
      "http://localhost:9200/" +
      queryObj.getCollection() +
      "/_search" +
      (queryObj != null ? queryObj.getMultiFieldQueryStr() : "");
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: queryObj != null ? queryObj.toJson() : null
    })
      .then(res => res.json())
      .then(
        result => {
          const elasticResponse = convertToElasticResponse(result);
          elasticContext.elastic.initializeElasticFromSearch(elasticResponse);
          console.log("Fetched complete");
          setElasticContext({ elastic: elasticContext.elastic });
        },
        error => {
          console.log(error);
        }
      );
  };
  const convertToElasticResponse = result => {
    const elasticResponse = new ElasticResponse(result.hits.total.value);
    elasticResponse.responseDocuments = [];
    result.hits.hits.forEach(element => {
      elasticResponse.responseDocuments.push(element._source);
    });
    if (result.aggregations) {
      const responseAggregations: ElasticAggregationResult[] = [];
      Object.keys(result.aggregations).map(key => {
        const elasticAggregation: ElasticAggregationResult = new ElasticAggregationResult();
        elasticAggregation.name = key;
        elasticAggregation.values = result.aggregations[key].buckets.map(
          v => new ElasticAggregationField(v.key, v.doc_count)
        );
        responseAggregations.push(elasticAggregation);
      });
      elasticResponse.responseAggregations = responseAggregations;
    }
    return elasticResponse;
  };

  return (
    <ElasticContext.Provider
      value={{
        elastic: elasticContext.elastic,
        performSearch: performSearch
      }}
    >
      {props.children}
    </ElasticContext.Provider>
  );
}
