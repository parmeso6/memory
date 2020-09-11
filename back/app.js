const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');


const hostname = '127.0.0.1';
const port = 3000;

function sampleRequest(req, res) {
    const reqUrl = url.parse(req.url, true);
    var name = 'World';
    if (reqUrl.query.name) {
        name = reqUrl.query.name
    }

    var response = {
        "text": "Hello " + name
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
};

//create a server object:
const server = http.createServer(function (req, res) {
    const reqUrl = url.parse(req.url, true);
    // GET Endpoint
    if (reqUrl.pathname == '/sample' && req.method === 'GET') {
        console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);

        sampleRequest(req, res);
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


