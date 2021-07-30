import React from 'react';
import './App.css';
import SearchDashBoard from './components/SearchDashBoard';
import Layout from './components/Layout/Layout';
import metadata from './collectionMetadataSample.json';
function App() {
  return (
    <div className="App">
      <SearchDashBoard metadataFields={metadata} >
        <Layout/>
      </SearchDashBoard>
    </div>
  );
}

export default App;
