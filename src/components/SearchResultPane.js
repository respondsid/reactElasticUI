import React, { useContext, useState } from "react";
import ElasticContext from "./../utils/context/ElasticContext";
import { Card, CardBody, Row, Col, Input } from "reactstrap";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";


const DetailValue = styled.div`
  display: inline-block;
  font-size: 12px;
  white-space: nowrap;
`;

const DetailLabel = styled.div`
  font-weight: bold;
  display: inline-block;
  justify-content: flex-start;
  font-size: 12px;
  word-wrap: none;
  white-space: nowrap;
`;

const FacetAggregationContainer = styled.div`
  display: flex;
  font-size:9px;
  
`;


const FacetContainer = styled.div`
  display: flex;
  border: solid 1px;
  padding:5px;
  border-radius: 15px;
  margin:2px;

  &:hover {
    cursor: pointer;
    background-color:beige;
  }
`;




const FacetContainerText = styled.div`
  justify-content:flex-start;
  `;

const FacetContainerIcon = styled.div`
  justify-content:flex-end;
  padding-left:3px;
  padding-bottom:3px;
  `;

export default function SearchResultPane(props) {
  const context = useContext(ElasticContext);
  const loaded = context.elastic.searchResults ? true : false;

  const isSelected = aggregation =>
    aggregation.values.filter(v => v.checked === true).length !== 0;

  const isAnyFacetSelected = aggregationResults =>
    aggregationResults.filter(aggregation =>
      isSelected(aggregation)
    ).length !== 0;

  const drawAggregation = aggregation => (
    <React.Fragment>
      {aggregation.values.map(v => (
        <React.Fragment>
          {v.checked ? <FacetContainer><FacetContainerText>{v.displayLabel}</FacetContainerText><FacetContainerIcon><IoMdClose/></FacetContainerIcon></FacetContainer> : ""}
        </React.Fragment>
      ))}
    </React.Fragment>
  );

  const drawFacets = () => (
    <React.Fragment>
      {context.elastic.aggregationResults && isAnyFacetSelected(context.elastic.aggregationResults) ? (
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

  const drawHeaderText = () => (
    <Row>
      <Col>
        {context.elastic.searchResults.length +
          " of " +
          context.elastic.elasticQuery.total}
      </Col>
    </Row>
  );

  const drawSearchResults = props => (
    <Row>
      <Col>
        {context.elastic.searchResults.map((result, index) => (
          <Row key={index} style={{ paddingTop: "1em" }}>
            <Card>
              <CardBody>
                <Row>
                  {Object.keys(result).map((key, index) => (
                    <Col key={index} style={{ display: "flex" }}>
                      <DetailLabel>{key} : </DetailLabel>
                      <DetailValue>{result[key]}</DetailValue>
                    </Col>
                  ))}
                </Row>
              </CardBody>
            </Card>
          </Row>
        ))}
      </Col>
    </Row>
  );
  return (
    <div>
      <Card>
        <CardBody>
          {!loaded ? (
            <div>loading</div>
          ) : (
            <div>
              {drawFacets()}
              {drawHeaderText()}
              {drawSearchResults()}
            </div>
          )}

          <Row>
            <Col></Col>
            <Col></Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}
