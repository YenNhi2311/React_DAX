
package com.edu.payload;

import com.edu.entities.EmployeeEntity;

public class LoginResponse {

    private EmployeeEntity employee;
    private String token;
    private String message;

    public LoginResponse(EmployeeEntity employee, String token) {
        this.employee = employee;
        this.token = token;
        this.message = null;
    }

    public LoginResponse(String message) {
        this.message = message;
        this.employee = null;
        this.token = null;
    }

    public LoginResponse(EmployeeEntity employee, String token, String message) {
        this.employee = employee;
        this.token = token;
        this.message = message;
    }

    public LoginResponse() {
        // Default constructor for deserialization
    }

    // Getters and setters

    public EmployeeEntity getEmployee() {
        return employee;
    }

    public void setEmployee(EmployeeEntity employee) {
        this.employee = employee;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
