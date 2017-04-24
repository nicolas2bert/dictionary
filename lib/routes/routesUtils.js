function errorResponse(response, error) {
    const dataError = {
        errors: [
            {
                internalMessage: error.internalMessage,
                code: error.code,
            },
        ],
    };
    const dataStringify = JSON.stringify(dataError);
    response.writeHead(error.code);
    return response.end(dataStringify, { 'Content-Type': 'application/json' });
}

const routesUtils = {
    serverResponse: (err, data, response) => {
        if (err) {
            return errorResponse(response, err);
        }
        response.writeHead(200);
        const dataStringify = JSON.stringify(data);
        return response.end(dataStringify,
          { 'Content-Type': 'application/json' });
    },
};

module.exports = routesUtils;
