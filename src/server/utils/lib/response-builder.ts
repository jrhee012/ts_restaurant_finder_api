// import request = require("request");

interface ErrorResponse {
    code: number;
    message: string;
    data: any;
}

class ResponseBuilder {
    name: string;

    constructor() {
        this.name = "Response Builder";
    }

    internal_server_error(): ErrorResponse {
        const response: ErrorResponse = {
            code: 500,
            message: "Internal Server Error",
            data: {},
        };
        return response;
    }

    unauthorized_error(): ErrorResponse {
        const response: ErrorResponse = {
            code: 401,
            message: "Unauthorized",
            data: {},
        };
        return response;
    }

    not_found_error(): ErrorResponse {
        const response: ErrorResponse = {
            code: 404,
            message: "Not Found",
            data: {},
        };
        return response;
    }
}

const responseBuilder = new ResponseBuilder();
export default responseBuilder;
