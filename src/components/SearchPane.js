import React, { useContext, useState } from "react";
import ElasticContext from "./../utils/context/ElasticContext";
import { Card, CardBody, Row, Col } from "reactstrap";
import SearchAggregation from "./SearchAggregation";
export default function SearchPane() {
  const context = useContext(ElasticContext);
  const [loaded, setLoaded] = useState(false);

  const drawAgreegationItemSection = () =>
    context.elastic.aggregationResults.map((aggregation, index) => (
      <SearchAggregation key={index} aggregation={aggregation}/>
    ));
  return (
    <Row> 
      <Col>
        {context.elastic &&
        context.elastic.aggregationResults &&
        context.elastic.aggregationResults.length > 0 ?
          drawAgreegationItemSection()
         : <div>loading</div>
        }
      </Col>
    </Row>
  );
}
