import React, { useContext, useState } from "react";
import ElasticContext from "./../utils/context/ElasticContext";
import { Card, CardBody, Row, Col, Input, Label } from "reactstrap";
import styled from "styled-components";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import PropTypes from "prop-types";

const AggregationValues = styled.div`
  font-size: 11px;
  display: flex;
`;

const AggregationValuesContainer = styled.div`
  max-height: 150px;
  overflow-y: auto;
  scroll-behavior: smooth;
`;

export default function SearchAggregation(props) {
  const context = useContext(ElasticContext);
  const [folded, setFolded] = useState(false);

  const drawHeaderSection = () => (
    <Row style={{ margin: "4px" }}>
      <Col style={{ textAlign: "left" }}>
        {props?.aggregation?.field?.display_label}
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
      <Col style={{ marginTop: "1em" }}>
        {props.aggregation.values.map((v, index) => (
          <AggregationValues
            key={index}
            style={{ justifyContent: "space-between" }}
          >
            <div
              size="8"
              style={{
                justifyContent: "flex-start",
                marginLeft: "1em",
                marginRight: "1em",
              }}
              className="form-check"
            >
              <Input
                style={{ height: "1em", weight: "1em" }}
                type="checkBox"
                onClick={(event) => {
                  v.checked = event.target.checked;
                  context.performSearch();
                }}
                id={v.key}
                checked={v.checked}
                className="form-check-input p-0"
              />
              <Label
                for={v.key}
                style={{
                  justifyContent: "flex-start",
                  marginRight: "1em",
                  marginLeft: "0.2em",
                  paddingTop: "3px",
                }}
                className="form-check-label"
              >
                {v.key}
              </Label>
            </div>

            <div
              size="4"
              style={{ justifyContent: "flex-end", marginRight: "2em" }}
            >
              ({v.doc_count})
            </div>
          </AggregationValues>
        ))}
      </Col>
    </AggregationValuesContainer>
  );

  return (
    <div style={{ marginBottom: "1em" }}>
      <Card style={{ borderRadius: "1em" }}>
        <CardBody>
          {" "}
          {drawHeaderSection()}
          {!folded ? drawAggregationValues() : ""}
        </CardBody>
      </Card>
    </div>
  );
}

SearchAggregation.propTypes = {
  aggregation: PropTypes.object,
};
