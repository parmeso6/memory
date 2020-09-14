const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres', //this is the db user credential
    database: 'test',
    password: '1234',
    port: 5432,
    max: 10, // max number of clients in the pool
});

/**
 * Create Score Table
 * Name of the table is: score
 * It contains 2 columns: 
 *  - id which is automatically generated at each insertion
 *      (it's like the number of the line)
 *  - time which contains an integer (INT) and can't be empty (NOT NULL)
 */
const createTable = () => {
    const createQuery =
        `CREATE TABLE IF NOT EXISTS scores
        (id SERIAL PRIMARY KEY, 
        time INT NOT NULL)`;

    pool.query(createQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

/**
 * Drop Score Table
 * (change the line 59 if you want to drop the table)
 */
const dropTable = () => {
    const dropQuery = 'DROP TABLE IF EXISTS scores';
    pool.query(dropQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};


pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

createTable();