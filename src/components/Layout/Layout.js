import React from 'react';
import { Row, Col,Container,Input,InputGroup,InputGroupAddon,InputGroupText} from 'reactstrap';
import SearchPane from "../SearchPane";
import SearchResultPane from "../SearchResultPane";
import styled from 'styled-components'
import { FaSearch } from "react-icons/fa";
// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled(Container)`
`;

const ContentColumn = styled(Col)`
`;

const SearchStyled = styled.div`
  margin:5px;
  padding:5px;
  
`;


export default function Layout() {
  return (
    <React.Fragment>
      <Wrapper>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
        <InputGroup>
        <Input placeholder="username" />
        <InputGroupAddon addonType="append">
          <InputGroupText><FaSearch/></InputGroupText>
        </InputGroupAddon>
      </InputGroup>
        </Col> 
      </Row>    
      <Row>
        <ContentColumn  xs="12" sm="3" md="3">
          <SearchStyled><SearchPane/></SearchStyled>
        </ContentColumn>
        <ContentColumn  sm="9" xs="12" md="9">
        <SearchStyled><SearchResultPane/></SearchStyled>
        </ContentColumn>
      </Row>
      </Wrapper>
    </React.Fragment>
  );
}
