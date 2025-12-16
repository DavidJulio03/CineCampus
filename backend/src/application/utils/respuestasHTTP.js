class ErrorResponse {
  
    constructor(status = 500, message = 'Error interno del servidor', details = null) {

        this.status = status;
        this.message = message;
        this.details = details;

    }

}

class SuccessResponse {
  
    constructor(status = 200, data = null) {

        this.status = status;
        this.message = 'Operacion exitosa';
        this.data = data;

    }

}

module.exports = { ErrorResponse, SuccessResponse } 