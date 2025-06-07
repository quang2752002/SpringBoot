package com.example.demo.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
@Getter
public enum ErrorCode {
    USER_EXISTED(1002,"User existed",HttpStatus.INTERNAL_SERVER_ERROR),
    UNCATEGORIZED_EXCEPTION(9999,"UNCATEGORIZED_EXCEPTION error",HttpStatus.BAD_REQUEST),
    INVALID_KEY(1001,"Invalid message key",HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1003,"username must be at last 3 characters",HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(1004,"password must be at last 8 characters",HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005,"User not existed",HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006,"Unauthenticated",HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007,"You do not not have  permission",HttpStatus.FORBIDDEN),
    ;

    ErrorCode(int code, String message,HttpStatus  statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode=statusCode;
    }

    private int code;
    private String message;
    private HttpStatus statusCode;




}
