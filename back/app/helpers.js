/*
* Helpers build HTTP responses
*/

exports.error = (res, error = 'An unknown error occurred', statusCode = 500) => {
    addHeaders(res);

    res.statusCode = statusCode;

    res.end(JSON.stringify({
        status: 'fail',
        error
    }, null, 3));
};

exports.success = (res, data = null) => {
    addHeaders(res);

    res.statusCode = 200;

    res.end(JSON.stringify({
        status: 'success',
        data
    }, null, 3));
};

exports.invalidRequest = (res) => {
    addHeaders(res);

    res.status = 404;

    res.end();
}

const addHeaders = (res) => {
    return res.setHeader('Content-Type', 'application/json');
}