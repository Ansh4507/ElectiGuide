const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();


const client = new Client({
connectionString: process.env.DATABASE_URL
});


async function connect() {
try {
await client.connect();
console.log('Connected to Postgres');
} catch (err) {
console.error('Postgres connection error:', err);
process.exit(1);
}
}


module.exports = { client, connect };