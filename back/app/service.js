/*
* Services contain database queries 
* and return of objects or error
*/
const db = require('./db.js');

exports.getBestScores = async () => {

    /*
    * Query:
    * First, we select the table from which we want to retrieve records using the SELECT statement
    * The DISTINCT statement removes duplicate values
    * Then, we sort the rows
    * Finaly, we use the FETCH clause to specify the number of rows we want to return.
    */
    const query =
        `SELECT DISTINCT * FROM scores
            ORDER BY time ASC
            FETCH FIRST 3 ROWS ONLY`;
    let response;

    try {
        response = await db.pool.query(query);
        return response.rows;
    } catch (error) {
        throw Error('Error while fetch');
    }
}

exports.addScore = async (time) => {
    let timeToAdd = parseInt(time, 10);

    // If time is not an integer, send an error
    if (!Number.isInteger(timeToAdd)) {
        throw Error('Error while data validation');
    }
    // Simple insertion
    const query = `INSERT INTO scores (time) VALUES (${timeToAdd})`;
    try {
        await db.pool.query(query);
        return true;
    } catch (error) {
        throw Error('Error while insert');
    }
};
