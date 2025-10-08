import React, { useState } from 'react';
import { searchJobs } from '../api/jobs';

export default function SearchBar({ onResults }) {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await searchJobs(query);
    onResults(res.data);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search jobs..."
      />
      <button type="submit">Search</button>
    </form>
  );
}
