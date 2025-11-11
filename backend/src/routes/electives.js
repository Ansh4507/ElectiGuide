const express = require('express');
const router = express.Router();
const { client } = require('../db');
const { csvToArray } = require('../models/helpers');


// GET /api/electives - list all
router.get('/', async (req, res) => {
try {
const result = await client.query(`SELECT e.*, d.name as department_name FROM electives e LEFT JOIN departments d ON e.department_id = d.id ORDER BY e.id`);
const rows = result.rows.map(r => ({
...r,
prerequisites: csvToArray(r.prerequisites),
created_at: r.created_at
}));
res.json(rows);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'internal' });
}
});


// GET /api/electives/:id
router.get('/:id', async (req, res) => {
const id = req.params.id;
try {
const result = await client.query('SELECT e.*, d.name as department_name FROM electives e LEFT JOIN departments d ON e.department_id = d.id WHERE e.id=$1', [id]);
if (result.rowCount === 0) return res.status(404).json({ error: 'not found' });
const r = result.rows[0];
r.prerequisites = csvToArray(r.prerequisites);
res.json(r);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'internal' });
}
});


// POST /api/electives - create
router.post('/', async (req, res) => {
const { code, name, department_id, semester, prerequisites, difficulty_level, avg_cgpa, description } = req.body;
try {
const result = await client.query(
`INSERT INTO electives (code, name, department_id, semester, prerequisites, difficulty_level, avg_cgpa, description)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
[code, name, department_id || null, semester || null, (prerequisites || []).join(','), difficulty_level || null, avg_cgpa || null, description || null]
);
res.status(201).json(result.rows[0]);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'internal' });
}
});


// PUT /api/electives/:id - update
router.put('/:id', async (req, res) => {
const id = req.params.id;
const { code, name, department_id, semester, prerequisites, difficulty_level, avg_cgpa, description } = req.body;
try {
const result = await client.query(
`UPDATE electives SET code=$1, name=$2, department_id=$3, semester=$4, prerequisites=$5, difficulty_level=$6, avg_cgpa=$7, description=$8 WHERE id=$9 RETURNING *`,
[code, name, department_id || null, semester || null, (prerequisites || []).join(','), difficulty_level || null, avg_cgpa || null, description || null, id]
);
if (result.rowCount === 0) return res.status(404).json({ error: 'not found' });
res.json(result.rows[0]);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'internal' });
}
});


// DELETE /api/electives/:id
router.delete('/:id', async (req, res) => {
const id = req.params.id;
try {
const result = await client.query('DELETE FROM electives WHERE id=$1 RETURNING *', [id]);
if (result.rowCount === 0) return res.status(404).json({ error: 'not found' });
res.json({ deleted: true });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'internal' });
}
});

module.exports = router;