const helpers = require('./helpers.js');
const db = require('./db.js');

class ScoreController {
    async getScores(res) {
        const query = 'SELECT * FROM scores';
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
