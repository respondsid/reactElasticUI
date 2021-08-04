import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Elastic from "../utils/context/Elastic";
import ElasticContext from "./../utils/context/ElasticContext";
import ElasticAggregationResult from "./../utils/context/modal/elastic-aggregation-item";
import ElasticResponse from "./../utils/context/modal/elastic-response";

function SearchDashBoard(props) {
  const [elasticContext, setElasticContext] = useState({
    elastic: new Elastic(props.metadataFields),
  });

  useEffect(() => {
    performSearch();
  }, []);

  /* const updateElasticContext = elastic => {
    setElasticContext(prevElasticContext => {
      const mergedContext = { ...prevElasticContext.elastic, ...elastic };
      return {elastic: mergedContext };
    });
  }; */

  const performSearch = async (resetPage = true) => {
    elasticContext.elastic.appendCheckedSelectionFilters();
    if (resetPage) {
      elasticContext.elastic.pageNumber = 1;
      elasticContext.elastic.elasticQuery.from = 0;
    }
    const queryObj = elasticContext.elastic.getElasticQuery();

    const url =
      "http://localhost:9200/" +
      queryObj.getCollection() +
      "/_search" +
      (queryObj != null ? queryObj.getMultiFieldQueryStr() : "");
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: queryObj != null ? queryObj.toJson() : null,
    });
    const response = await res.json();
    const elasticResponse = convertToElasticResponse(response);
    elasticContext.elastic.initializeElasticFromSearch(elasticResponse);
    console.log("Fetched complete");
    setElasticContext({ elastic: elasticContext.elastic });
  };

  const convertToElasticResponse = (result) => {
    const elasticResponse = new ElasticResponse(result.hits.total.value);
    elasticResponse.responseDocuments = [];
    result.hits.hits.forEach((element) => {
      elasticResponse.responseDocuments.push(element._source);
    });
    if (result.aggregations) {
      const responseAggregations = [];
      Object.keys(result.aggregations).forEach((key) => {
        const elasticAggregation = new ElasticAggregationResult();
        elasticAggregation.name = key;
        elasticAggregation.values = result.aggregations[key].buckets;
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
        performSearch: performSearch,
      }}
    >
      {props.children}
    </ElasticContext.Provider>
  );
}

SearchDashBoard.propTypes = {
  metadataFields: PropTypes.object,
  children: PropTypes.element,
};

export default SearchDashBoard;
