const helpers = require('./helpers.js');
const db = require('./db.js');

class ScoreController {
    async getBestScores(res) {

        /*
        * Query:
        * First, we select the table from which we want to retrieve records using the SELECT statement
        * The DISTINCT statement removes duplicate values
        * Then, we sort the rows
        * Finaly, we use the FETCH clause to specify the number of rows we want to return.
        */
        const query =
            `SELECT DISTINCT * FROM scores
            ORDER BY time DESC
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

    async addScore(req, res, postData) {
        postData = JSON.parse(postData);
        let { score } = postData;
        const query = 'INSERT INTO scores (time) VALUES (' + score + ')';
        db.query(query, (error, result) => {
            if (error) {
                return helpers.error(res, error, 400)
            }
            return helpers.success(res);
        });
        ;
    };
}

module.exports = new ScoreController();
