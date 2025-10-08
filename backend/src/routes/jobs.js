const express = require('express');
const router = express.Router();
const db = require('../db');
const es = require('../es');

// Create job
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO jobs (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    await es.index({
      index: 'jobs',
      id: result.rows[0].id,
      body: { title, description },
    });
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Search jobs by title or description
router.get('/search', async (req, res) => {
  const { q } = req.query;
  try {
    const result = await es.search({
      index: 'jobs',
      body: {
        query: {
          multi_match: {
            query: q,
            fields: ['title', 'description'],
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
