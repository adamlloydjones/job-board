import React, { useEffect, useState } from 'react';
import { fetchJobs } from '../api/jobs';

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs().then(res => setJobs(res.data));
  }, []);

  return (
    <div>
      <h2>Job Listings</h2>
      <ul>
        {jobs.map(job => (
          <li key={job.id}>
            <strong>{job.title}</strong>: {job.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
