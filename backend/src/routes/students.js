const express = require('express');
const router = express.Router();
const { client } = require('../db');
const { csvToArray } = require('../models/helpers');


// GET /api/students
router.get('/', async (req, res) => {
try {
const result = await client.query(`SELECT s.*, d.name as department_name FROM students s LEFT JOIN departments d ON s.department_id = d.id ORDER BY s.id`);
const rows = result.rows.map(r => ({
...r,
skills: csvToArray(r.skills)
}));
res.json(rows);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'internal' });
}
});


// POST /api/students
router.post('/', async (req, res) => {
const { name, email, department_id, year, skills } = req.body;
try {
const result = await client.query(
`INSERT INTO students (name,email,department_id,year,skills) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
[name, email, department_id || null, year || null, (skills || []).join(',')]
);
res.status(201).json(result.rows[0]);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'internal' });
}
});


module.exports = router;