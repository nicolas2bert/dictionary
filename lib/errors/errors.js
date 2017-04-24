module.exports = {
    ok: {
        code: 200,
        internalMessage: 'OK',
        moreInfo: 'Eyerything is working',
    },
    ok201: {
        code: 201,
        internalMessage: 'OK',
        moreInfo: 'New resource has been created',
    },
    ok204: {
        code: 204,
        internalMessage: 'OK',
        moreInfo: 'The resource was successfully deleted',
    },
    NotModified: {
        code: 304,
        internalMessage: 'Not Modified',
        moreInfo: 'The client can use cached data',
    },
    BadRequest: {
        code: 400,
        internalMessage: 'Bad Request',
        moreInfo: 'The request was invalid or cannot be served. ' +
        'The exact error should be explained in the error payload. E.g. ' +
        '„The JSON is not valid“',
    },
    Unauthorized: {
        code: 401,
        internalMessage: 'Unauthorized',
        moreInfo: 'The request requires an user authentication',
    },
    Forbidden: {
        code: 403,
        internalMessage: 'Forbidden',
        moreInfo: 'The server understood the request, but is refusing it or ' +
        'the access is not allowed.',
    },
    NotFound: {
        code: 404,
        internalMessage: 'Not Found',
        moreInfo: 'Not found – There is no resource behind the URI',
    },
    UnprocessableEntity: {
        code: 422,
        internalMessage: 'Unprocessable Entity',
        moreInfo: 'Should be used if the server cannot process the enitity, ' +
        'e.g. if an image cannot be formatted or mandatory fields are ' +
        'missing in the payload.',
    },
    InternalError: {
        code: 404,
        internalMessage: 'InternalError',
        moreInfo: 'API developers should avoid this error. If an error ' +
        'occurs in the global catch blog, the stracktrace should be logged' +
        ' and not returned as response.',
    },
};
