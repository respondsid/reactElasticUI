import React, { useContext } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import Pagination from "react-responsive-pagination";
import styled from "styled-components";
import ElasticContext from "./../utils/context/ElasticContext";
import SearchFacets from "./SearchFacets";

const DetailValue = styled.div`
  font-size: 12px;
  max-width: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    overflow: visible;
    white-space: normal;
  }
`;

const TopResultContainer = styled(Row)`
  border: 1px;
  border-style: dotted;
  border-radius: 1em;
  border-color: #89a2f0;
  margin-bottom: 0.5em;
  &:hover {
    background-color: #f2f3ff;
  }
`;

const DetailLabel = styled.div`
  font-size: 12px;
  max-width: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
  white-space: nowrap;
  &:hover {
    overflow: visible;
    white-space: normal;
  }
`;

export default function SearchResultPane(props) {
  const context = useContext(ElasticContext);
  const loaded = !!context.elastic.searchResults;

  const drawHeaderText = () => (
    <Row
      style={{
        marginBottom: "2em",
        justifyContent: "space-between",
        fontSize: "8px",
        fontWeight: "bold",
      }}
    >
      <Col style={{ flexGrow: "0.15" }}>
        {"Page " +
          context.elastic.pageNumber +
          " of " +
          context.elastic.totalNumberOfPages}
      </Col>
      <Col style={{ flexGrow: "0.15" }}>
        {"Total: " + context.elastic.elasticQuery.total + " record(s) "}
      </Col>
    </Row>
  );

  const drawSearchResults = (props) => (
    <div xs="1" sm="1" md="1" lg="1">
      {context.elastic.searchResults.map((result, index) => (
        <TopResultContainer key={index} xs="2" sm="2" md="3" lg="4">
          {Object.keys(result).map((key, index) => (
            <Col
              key={index}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                padding: "0.50em",
              }}
            >
              <DetailLabel>{key} : </DetailLabel>
              <DetailValue>{" " + result[key]}</DetailValue>
            </Col>
          ))}
        </TopResultContainer>
      ))}
    </div>
  );
  const handlePageClick = (pageNumber) => {
    if (pageNumber < context.elastic.totalNumberOfPages) {
      context.elastic.elasticQuery.from =
        pageNumber * context.elastic.elasticQuery.size;
      context.elastic.pageNumber = pageNumber;
      context.performSearch(false);
    }
  };

  const drawPagination = () => (
    <Pagination
      current={context.elastic.pageNumber}
      total={context.elastic.totalNumberOfPages}
      onPageChange={handlePageClick}
    />
  );

  return (
    <Card style={{ borderRadius: "1em" }}>
      <CardBody>
        {!loaded ? (
          <div>loading</div>
        ) : (
          <div>
            <SearchFacets />
            {drawHeaderText()}
            {drawSearchResults()}
            {drawPagination()}
          </div>
        )}

        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
      </CardBody>
    </Card>
  );
}
