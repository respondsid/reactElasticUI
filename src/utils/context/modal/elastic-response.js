export default class ElasticResponse {
  constructor(total) {
    this.total = total;
    this.responseDocuments = [];
    this.responseAggregations = [];
  }
}
