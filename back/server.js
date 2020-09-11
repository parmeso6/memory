const http = require('http');
const url = require('url');

const ScoreController = require('./app/controller');
const helpers = require('./app/helpers')

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);
    // GET Endpoint
    if (reqUrl.pathname == '/' && req.method === 'GET') {
        console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);

        ScoreController.getBestScores(res);

        // POST Endpoint
    } else if (reqUrl.pathname == '/' && req.method === 'POST') {
        console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);

        helpers.getPostData(req).then((data) => {
            ScoreController.addScore(req, res, data)
        });

    } else {
        console.log('Request Type:' +
            req.method + ' Invalid Endpoint: ' +
            reqUrl.pathname);

        helpers.invalidRequest(req, res);

    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
