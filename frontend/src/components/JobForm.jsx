import React, { useState } from 'react';
import { createJob } from '../api/jobs';

export default function JobForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createJob({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Post a Job</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Job Title" />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <button type="submit">Submit</button>
    </form>
  );
}
