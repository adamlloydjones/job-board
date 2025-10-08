import React, { useState } from 'react';
import { createCandidate } from '../api/candidates';

export default function CandidateForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    resume_url: '',
    skills: '',
    tags: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      skills: form.skills.split(',').map(s => s.trim()),
      tags: form.tags.split(',').map(t => t.trim())
    };
    await createCandidate(payload);
    setForm({ name: '', email: '', resume_url: '', skills: '', tags: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Candidate</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input name="resume_url" value={form.resume_url} onChange={handleChange} placeholder="Resume URL" />
      <input name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma-separated)" />
      <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma-separated)" />
      <button type="submit">Submit</button>
    </form>
  );
}
