export class ElasticQueryBuilder {
    constructor() {
        this._source = [];
        this.query = {};
        this.aggs = {};
        this.size = 20;
        this.from = 0;
        this.collection='';
        this.toJson=this.toJson.bind(this);
        this.resetQuery=this.resetQuery.bind(this);
        this.getMultiFieldQueryStr=this.getMultiFieldQueryStr.bind(this);
        this.prepareMultiFieldQuery=this.prepareMultiFieldQuery.bind(this);
        this.getCollection=this.getCollection.bind(this);
        this.prepareQuery=this.prepareQuery.bind(this);
    }
     prepareQuery() {
        if (!this.query.query) {
            this.query = {
                'bool': {
                    'must': []
                }
            };
        }
    }

    prepareMultiFieldQuery(term) {
        this.resetQuery();
        this.multiFieldQuery=term; 
    }

    getMultiFieldQueryStr(){
        if(this.multiFieldQuery && this.multiFieldQuery.trim()!==''){
            return '?q='+this.multiFieldQuery;
        }
        return '';
    }

    

    resetQuery() {
        this.query = {};
    }



    toJson() {
        const obj = {};
        if (this.size && this._source.length > 0) {
            obj._source = this._source;
        }
        if (this.aggs) {
            obj.aggs = this.aggs;
        }
        if (this.query && (this.query.bool)) {
            obj.query = this.query;
        }
        obj.size = this.size;
        obj.from = this.from;
        return JSON.stringify(obj);

    }

    getCollection(){
        return this.collection;
    }

}
