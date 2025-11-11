const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


const { connect } = require('./db');
const electivesRouter = require('./routes/electives');
const studentsRouter = require('./routes/students');


const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use('/api/electives', electivesRouter);
app.use('/api/students', studentsRouter);


app.get('/', (req, res) => res.send({ status: 'ElectiGuide Phase 1 API', uptime: process.uptime() }));


const PORT = process.env.PORT || 4000;


async function start() {
await connect();
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}


start();