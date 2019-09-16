import React, { useContext, useState } from "react";
import ElasticContext from "./../utils/context/ElasticContext";
import { Card, CardBody, Row, Col, Input } from "reactstrap";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

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

export default function SearchResultPane(props) {
  const context = useContext(ElasticContext);
  const loaded = context.elastic.searchResults ? true : false;

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
          <Row key={index} style={{paddingTop:'1em'}}>
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
