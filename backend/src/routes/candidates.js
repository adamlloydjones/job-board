const express = require('express');
const router = express.Router();
const db = require('../db');
const es = require('../es');

// Create candidate
router.post('/', async (req, res) => {
  const { name, email, resume_url, skills, tags } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO candidates (name, email, resume_url, skills, tags) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, resume_url, skills, tags]
    );
    await es.index({
      index: 'candidates',
      id: result.rows[0].id,
      body: result.rows[0],
    });
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search candidates
router.get('/search', async (req, res) => {
  const { q } = req.query;
  try {
    const result = await es.search({
      index: 'candidates',
      body: {
        query: {
          multi_match: {
            query: q,
            fields: ['name', 'skills', 'tags'],
            fuzziness: 'AUTO'
          }
        }
      }
    });
    const hits = result.hits.hits.map(hit => hit._source);
    res.json(hits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
