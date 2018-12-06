// import request = require("request");

interface IErrorResponse {
    code: number;
    message: string;
    data: any;
}

class ResponseBuilder {
    // name: string;

    constructor() {
        // this.name = "Response Builder";
    }

    internal_server_error(data?: any) {
        const response: IErrorResponse = {
            code: 500,
            message: "Internal Server Error",
            data: data ? data : {},
        };
        return response;
    }

    unauthorized_error(data?: any) {
        const response: IErrorResponse = {
            code: 401,
            message: "Unauthorized",
            data: data ? data : {},
        };
        return response;
    }

    not_found_error(data?: any) {
        const response: IErrorResponse = {
            code: 404,
            message: "Not Found",
            data: data ? data : {},
        };
        return response;
    }

    api_success(data?: any) {
        const response: IErrorResponse = {
            code: 200,
            message: "ok",
            data: data ? data : {},
        };
        return response;
    }
}

const responseBuilder = new ResponseBuilder();
export default responseBuilder;
