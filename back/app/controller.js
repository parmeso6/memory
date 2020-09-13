const helpers = require('./helpers.js');
const db = require('./db.js');

/*
* Get values from db and return
*/
exports.getBestScores = (res) => {

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
    db.query(query, (error, result) => {
        if (error) {
            return helpers.error(res, error, 400)
        }
        if (result.rows < '1') {
            return helpers.error(res, 'No score information found', 404)
        } else {
            return helpers.success(res, result.rows);
        }
    });
    ;
}

/*
* Check if the value is valid
* Insert it
* Return success if so
*/
exports.addScore = (res, body) => {
    let time = parseInt(body.time, 10);

    // If time is not an integer, send an error
    if (!Number.isInteger(time)) {
        return helpers.validationError(res);
    }

    // Simple insertion
    const query = 'INSERT INTO scores (time) VALUES (' + time + ')';
    db.query(query, (error, result) => {
        if (error) {
            return helpers.error(res, error, 400)
        }
        return helpers.success(res);
    });
    ;
};
