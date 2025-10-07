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

module.exports = router;
