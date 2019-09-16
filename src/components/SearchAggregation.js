import React, { useContext, useState } from "react";
import ElasticContext from "./../utils/context/ElasticContext";
import { Card, CardBody, Row, Col, Input } from "reactstrap";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

const AggregationValues = styled(Row)`
  margin: 4px;
  font-size: 10px;
  display
`;

const AggregationValuesContainer = styled(Row)`
  max-height: 150px;
  overflow-y: auto;
  padding-top: 5px;
  padding-left: 5px;
`;

export default function SearchAggregation(props) {
  const context = useContext(ElasticContext);
  const [folded, setFolded] = useState(false);

  const drawHeaderSection = () => (
    <Row>
      <Col style={{ textAlign: "left" }}>
        {props.aggregation.field.display_label}
      </Col>
      <Col style={{ textAlign: "right" }}>
        {folded ? (
          <IoIosArrowDown onClick={() => setFolded(!folded)} />
        ) : (
          <IoIosArrowForward
            onClick={() => setFolded(!folded)}
          ></IoIosArrowForward>
        )}
      </Col>
    </Row>
  );

  const drawAggregationValues = () => (
    <AggregationValuesContainer>
      <Col>
        {props.aggregation.values.map((v, index) => (
          <AggregationValues key={index}>
            <Col size="8" style={{ textAlign: "left" }}>
              {v.displayLabel}
            </Col>

            <Col size="4">
              <Row style={{ justifyContent: "flex-end" }}>
                <Col style={{ float: "right" }}>({v.doc_count})</Col>
                <Col>
                  <Input
                    style={{ height: "12px", weight: "12px" }}
                    type="checkBox"
                    onClick={(event) => {
                      v.checked = event.target.checked;
                      context.performSearch();
                    }}
                  />
                </Col>
              </Row>
            </Col>
          </AggregationValues>
        ))}
      </Col>
    </AggregationValuesContainer>
  );

  return (
    <div style={{ marginBottom: "6px" }}>
      <Card>
        <CardBody>
          {" "}
          {drawHeaderSection()}
          {!folded ? drawAggregationValues() : ""}
        </CardBody>
      </Card>
    </div>
  );
}
