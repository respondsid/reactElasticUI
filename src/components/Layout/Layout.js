import React, { useContext } from 'react';
import { Row, Col,Container,Input,InputGroup,InputGroupAddon,InputGroupText} from 'reactstrap';
import SearchPane from "../SearchPane";
import SearchResultPane from "../SearchResultPane";
import styled from 'styled-components'
import { FaSearch } from "react-icons/fa";
import ElasticContext from '../../utils/context/ElasticContext';
// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled(Container)`
background-color: #96ad63;
`;

const ContentColumn = styled(Col)`
`;

const SearchStyled = styled.div`
  margin:1px;
  padding:3px;
  
`;


export default function Layout() {
  const context = useContext(ElasticContext);
  return (
    <React.Fragment>
      <Wrapper>
      <Row style={{marginTop:'2em',paddingTop:'2em'}}>
        <Col  sm="12" md={{ size: 6, offset: 3 }}>
        <InputGroup>
        <Input placeholder="username" onChange={(event)=>{
              context.elastic.queryText =event.target.value;
        }}/>
        <InputGroupAddon addonType="append">
          <InputGroupText><FaSearch  onClick={()=>{
              context.performSearch();
        }}/></InputGroupText>
        </InputGroupAddon>
      </InputGroup>
        </Col> 
      </Row>    
      <Row style={{marginTop:'2em'}}>
        <ContentColumn  xs="12" sm="4" md="4">
          <SearchStyled><SearchPane/></SearchStyled>
        </ContentColumn>
        <ContentColumn  sm="8" xs="12" md="8">
        <SearchStyled><SearchResultPane/></SearchStyled>
        </ContentColumn>
      </Row>
      </Wrapper>
    </React.Fragment>
  );
}
