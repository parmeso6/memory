const http = require('http');
const url = require('url');

const score_controller = require('./app/controller');
const helpers = require('./app/helpers')

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);
    // GET Endpoint
    if (reqUrl.pathname == '/best_scores' && req.method === 'GET') {
        score_controller.getBestScores(res);

        // POST Endpoint
    } else if (reqUrl.pathname == '/new_score' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            body = JSON.parse(body);
            score_controller.addScore(res, body);
        });


    } else {
        helpers.invalidRequest(res);

    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
