/*
* Controller manage all the logic of validating query parameters, 
* and send responses with the correct statusCodes.
*/

const helpers = require('./helpers');
const db = require('./db');
const ScoreService = require('./service')

exports.getBestScores = async (res) => {
    try {
        const scores = await ScoreService.getBestScores();
        return helpers.success(res, scores);
    } catch (error) {
        return helpers.error(res, error, 400)
    }
}

exports.addScore = async (req, res) => {
    try {
        let body = await getBody(req);
        await ScoreService.addScore(body.time);
        return helpers.success(res)
    } catch (error) {
        return helpers.error(res, error.message)
    }
}

const getBody = async (req) => {
    // Return new promise
    return new Promise(function (resolve) {
        let body = '';
        // Do async job
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            body = JSON.parse(body); // Convert string to an object
            resolve(body);
        });
    })
}
