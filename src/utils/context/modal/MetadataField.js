import { FaRegKeyboard } from "react-icons/fa";
import { keyframes } from "styled-components";

export class MetadataField {
    constructor(obj) {
        this.field_id = obj.field_id;
        this.field_name = obj.field_name;
        this.display_label = obj.display_label;
        this.field_type = obj.field_type;
        this.range = obj.range;
        this.range_label = obj.range_label;
        this.facet_ind = obj.facet_ind;
        this.collection = obj.collection;
        this.raw_ind=obj.raw_ind;
        this.getAggregationObject=this.getAggregationObject.bind(this);
        this.getFilterQueryObject=this.getFilterQueryObject.bind(this);
        this.getFieldName=this.getFieldName.bind(this);
    }

    getAggregationObject() {
        if (this.facet_ind) {
            if (this.field_type !== 'RANGE') {
                const obj = {terms:{field:this.getFieldName()}};
                obj.terms.size = 100;
                return obj;
            } else {
                const obj = {range:{field:this.getFieldName()}};
                obj.range.ranges = this.range;
                obj.range.ranges.size = 100;
                return obj;
            }
        }
        return null;
    }

    getFilterQueryObject(value) {
        if (this.facet_ind) {
            if (this.field_type !== 'RANGE') {
                const obj = JSON.parse('{"term":{"' + this.getFieldName() + '":"' + value.key + '"}}');
                return obj;
            } else {
                const obj = {};
                obj.range = {}
                obj.range[this.getFieldName()] = {};
                obj.range[this.getFieldName()].gte = value?.from;
                obj.range[this.getFieldName()].lte = value?.to;
                return obj;

            }

        }
        return null;
    }

    getFieldName(){
        if(this.raw_ind && this.raw_ind==='false'){
            return   this.field_name;
        }
        return this.field_name+".raw";
    }

}