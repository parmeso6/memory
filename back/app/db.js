// Suggested project structure -> https://node-postgres.com/guides/project-structure

const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres', //this is the db user credential
    database: 'test',
    password: '1234',
    port: 5432,
});

pool.on('error', (err, client) => {
    console.error('unexpected error on idle client', err)
    process.exit(-1)
})

pool.on('connect', () => {
    console.log('connected to the Database');
});

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

module.exports = {
    pool,
    query: (text, params, callback) => {
        const start = Date.now()
        return pool.query(text, params, (err, res) => {
            const duration = Date.now() - start
            console.log('executed query', { text, duration, rows: res.rowCount })
            callback(err, res)
        })
    },
}
