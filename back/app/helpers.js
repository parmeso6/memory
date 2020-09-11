exports.validationError = (res, error = 'Data provided is not valid') => {
    addHeaders(res);

    res.statusCode = 422;

    res.end(JSON.stringify({
        status: 'fail',
        error
    }, null, 3));
};

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

const addHeaders = (res) => {
    return res.setHeader('Content-Type', 'application/json');
}

/**
* Extract posted data from request body
* @param req
* @returns {Promise<any>}
*/
exports.getPostData = (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString(); // convert Buffer to string
            });

            req.on('end', () => {
                resolve(body);
            });
        }
        catch (e) {

            console.log('err dans getPostData', err)
            reject(e);
        }
    });
}