import React, { useContext } from "react";
import { IoMdClose } from "react-icons/io";
import styled from "styled-components";
import ElasticContext from "./../utils/context/ElasticContext";

const FacetAggregationContainer = styled.div`
  display: flex;
  font-size: 9px;
  flex-wrap: wrap;
`;

const AggregationDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  
`;

const AggregationDisplayLabelContainer = styled.div`
  position: absolute;
  margin-left: 3px;
  margin-top: -8px;
  background-color: #FFFFFF;
  padding-left: 2px;
  padding-right:2px;
`;
const AggregationDisplayLabelBlankContainer = styled.div`
  position: absolute;
  margin-top: -8px;
  
`;

const AggregationContainer = styled.div``;

const AggregationFirstContainer = styled.div`
  border-top: solid #dbdbdb 1px;
  border-bottom: solid #dbdbdb 1px;
  border-left: solid #dbdbdb 1px;
`;
const AggregationLastContainer = styled.div`
  border-top: solid #dbdbdb 1px;
  border-bottom: solid #dbdbdb 1px;
  border-right: solid #dbdbdb 1px;
`;
const AggregationOneContainer = styled.div`
  border-top: solid #dbdbdb 1px;
  border-bottom: solid #dbdbdb 1px;
  border-right: solid #dbdbdb 1px;
  border-left: solid #dbdbdb 1px;
`;
const AggregationMiddleContainer = styled.div`
  border-top: solid #dbdbdb 1px;
  border-bottom: solid #dbdbdb 1px;
`;
const FacetContainer = styled.div`
  display: flex;
  border: solid #dbdbdb 1px;
  padding: 2px 5px 2px 5px;
  border-radius: 15px;
  margin: 5px;

  &:hover {
    cursor: pointer;
    background-color: #96ad63;
    font-weight: bold;
    color: #ffffff;
  }
`;

const FacetContainerText = styled.div`
  justify-content: flex-start;
`;

const FacetContainerIcon = styled.div`
  justify-content: flex-end;
  padding-left: 3px;
  padding-bottom: 3px;
`;
export default function SearchFacets() {
    const context = useContext(ElasticContext);
    const loaded = context.elastic.searchResults ? true : false;

    const isSelected = aggregation =>
    aggregation.values.filter(v => v.checked === true).length !== 0;

  const selectedAggregation = aggregation =>
    aggregation.values.filter(v => v.checked === true);

  const isAnyFacetSelected = aggregationResults =>
    aggregationResults.filter(aggregation => isSelected(aggregation)).length !==
    0;

  const displaySelection = v => (
    <FacetContainer>
      <FacetContainerText>{v.displayLabel}</FacetContainerText>
      <FacetContainerIcon>
        <IoMdClose
          onClick={event => {
            v.checked = event.target.checked;
            context.performSearch();
          }}
        />
      </FacetContainerIcon>
    </FacetContainer>
  );

  const drawAggregation = aggregation => (
    <div style={{display:'flex',marginLeft:'2px'}}>
      {selectedAggregation(aggregation).map((v, index, aggr) => (
        <AggregationDisplayContainer>
          {index === 0 ? (
            <AggregationDisplayLabelContainer>
              {aggregation.field.display_label}
            </AggregationDisplayLabelContainer>
          ) : (
            <AggregationDisplayLabelBlankContainer>
              &nbsp;
            </AggregationDisplayLabelBlankContainer>
          )}
          <div>
            {index === 0 && aggr.length == 1 ? (
              <AggregationOneContainer>
                {displaySelection(v)}
              </AggregationOneContainer>
            ) : index === 0 && aggr.length > 1 ? (
              <AggregationFirstContainer>
                {displaySelection(v)}
              </AggregationFirstContainer>
            ) : index === aggr.length - 1 ? (
              <AggregationLastContainer>
                {displaySelection(v)}
              </AggregationLastContainer>
            ) : (
              <AggregationMiddleContainer>
                {displaySelection(v)}
              </AggregationMiddleContainer>
            )}
          </div>
        </AggregationDisplayContainer>
      ))}
    </div>
  );

  const drawFacets = () => (
    <React.Fragment>
      {context.elastic.aggregationResults &&
      isAnyFacetSelected(context.elastic.aggregationResults) ? (
        <FacetAggregationContainer>
          {context.elastic.aggregationResults.map((aggregation, index) => (
            <React.Fragment> {drawAggregation(aggregation)}</React.Fragment>
          ))}
        </FacetAggregationContainer>
      ) : (
        ""
      )}
    </React.Fragment>
  );


    return (
        <React.Fragment>
            {drawFacets()}
        </React.Fragment>
    )
}
