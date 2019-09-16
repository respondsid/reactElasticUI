export default class ElasticAggregationField {
      constructor(key, doc_count) {
        this.key = key;
        this.displayLabel = key;
        this.doc_count = doc_count;
        this.checked=false;
    }

}