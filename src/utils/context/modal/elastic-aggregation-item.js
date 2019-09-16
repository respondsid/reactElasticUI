export default class ElasticAggregationResult {
  constructor(name, field) {
    this.name = name;
    this.field = field;
    this.values = [];
    this.filterValues = [];
  }
}
