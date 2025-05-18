package com.example.demo.exception;

public enum ErrorCode {
    USER_EXISTED(1002,"User existed"),
    UNCATEGORIZED_EXCEPTION(9999,"UNCATEGORIZED_EXCEPTION error"),
    INVALID_KEY(1001,"Invalid message key"),
    USERNAME_INVALID(1003,"username must be at last 3 characters"),
    PASSWORD_INVALID(1004,"password must be at last 8 characters"),

    ;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    private int code;
    private String message;

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
