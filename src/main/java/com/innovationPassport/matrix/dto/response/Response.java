package com.innovationPassport.matrix.dto.response;

import lombok.Data;

@Data
public class Response {

    private int code;
    private String message;
    private Exception exception;


    public Response(int code, String message, Exception exception) {
        this.code = code;
        this.message = message;
        this.exception = exception;
    }

}
