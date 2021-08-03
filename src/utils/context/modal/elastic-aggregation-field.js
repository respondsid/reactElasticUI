export default class ElasticAggregationField {
  constructor(key, docCount) {
    this.key = key;
    this.displayLabel = key;
    this.docCount = docCount;
    this.checked = false;
  }
}
