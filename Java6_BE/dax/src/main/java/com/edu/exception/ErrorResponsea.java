package com.edu.exception;

public class ErrorResponsea {
    private String message;

    public ErrorResponsea(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}