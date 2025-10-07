import React from 'react';
import JobList from './components/JobList';
import JobForm from './components/JobForm';

function App() {
  return (
    <div>
      <h1>ATS Job Board</h1>
      <JobForm />
      <JobList />
    </div>
  );
}

export default App;
