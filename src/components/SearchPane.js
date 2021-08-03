import React, { useContext } from "react";
import ElasticContext from "./../utils/context/ElasticContext";
import SearchAggregation from "./SearchAggregation";
export default function SearchPane() {
  const context = useContext(ElasticContext);

  const drawAgreegationItemSection = () =>
    context.elastic.aggregationResults.map((aggregation, index) => (
      <SearchAggregation key={index} aggregation={aggregation} />
    ));
  return (
    <div>
      {context.elastic &&
      context.elastic.aggregationResults &&
      context.elastic.aggregationResults.length > 0 ? (
        drawAgreegationItemSection()
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}
