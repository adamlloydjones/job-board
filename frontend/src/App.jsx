import React, { useState } from 'react';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import SearchBar from './components/SearchBar';
import CandidateForm from './components/CandidateForm';
import CandidateSearch from './components/CandidateSearch';

function App() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div>
      <h1>ATS Job Board</h1>
      <SearchBar onResults={setSearchResults} />
      <JobForm />
      <JobList jobs={searchResults.length ? searchResults : null} />
      <CandidateForm />
      <CandidateSearch />

    </div>
  );
}

export default App;
