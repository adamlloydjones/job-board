import React, { useState } from 'react';
import { searchCandidates } from '../api/candidates';

export default function CandidateSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await searchCandidates(query);
    setResults(res.data);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search candidates..." />
        <button type="submit">Search</button>
      </form>
      <ul>
        {results.map(c => (
          <li key={c.id}>
            <strong>{c.name}</strong> ({c.email})<br />
            Skills: {c.skills.join(', ')}<br />
            Tags: {c.tags.join(', ')}<br />
            <a href={c.resume_url} target="_blank" rel="noreferrer">Resume</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
