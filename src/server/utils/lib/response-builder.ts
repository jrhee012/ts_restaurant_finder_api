import request = require("request");

interface ErrorResponse {
    code: number;
    message: string;
    meta: any[];
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
            meta: [],
        };
        return response;
    }
}

const responseBuilder = new ResponseBuilder();
export default responseBuilder;
