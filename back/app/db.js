// Suggested project structure -> https://node-postgres.com/guides/project-structure

const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres', //this is the db user credential
    database: 'memory',
    password: '1234',
    port: 5432,
});

pool.on('error', (err, client) => {
    console.error('unexpected error on idle client', err)
})

pool.on('connect', () => {
    console.log('connected to the Database');
});

pool.on('remove', () => {
    console.log('client removed');
});

module.exports = {
    pool,
}
