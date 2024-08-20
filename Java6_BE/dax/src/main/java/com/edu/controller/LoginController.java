package com.edu.controller;

import com.edu.entities.EmployeeEntity;
import com.edu.services.EmployeeService;
<<<<<<< HEAD
<<<<<<< HEAD
import com.edu.utils.ImageUtils;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import com.edu.payload.LoginRequest;
import com.edu.payload.LoginResponse;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.Optional;

=======
import com.edu.payload.LoginRequest;
import com.edu.payload.LoginResponse;
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
import com.edu.payload.LoginRequest;
import com.edu.payload.LoginResponse;
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
<<<<<<< HEAD
<<<<<<< HEAD
import org.springframework.web.multipart.MultipartFile;
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticateUser(@RequestBody LoginRequest loginRequest) {
        EmployeeEntity employee = employeeService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());
        if (employee != null) {
            String token = employeeService.generateToken(employee);
            System.out.println("Employee Role: " + employee.getRole()); // Debugging
            System.out.println("token" + token);
            return ResponseEntity.ok(new LoginResponse(employee, token));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse("Invalid username or password"));
        }
    }

    @GetMapping("/user")
<<<<<<< HEAD
<<<<<<< HEAD
public ResponseEntity<LoginResponse> getCurrentUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
    try {
        // Xử lý token để lấy thông tin người dùng
        String username = employeeService.getUsernameFromToken(token);
        EmployeeEntity employee = employeeService.getEmployeeByUsername(username);
        if (employee != null) {
            return ResponseEntity.ok(new LoginResponse(employee, null));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new LoginResponse("User not found"));
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new LoginResponse("Invalid or expired token"));
    }
}

@GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable("id") int id) {
        EmployeeEntity employee = employeeService.getEmployeeById(id);
        if (employee != null) {
            return ResponseEntity.ok(employee);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @PutMapping("/update-user")
    public ResponseEntity<?> updateUser(
            @RequestParam("fullname") String fullname,
            @RequestParam("username") String username,
            @RequestParam("email") String email,
            @RequestParam("gender") Boolean gender,
            @RequestParam("phoneNumber") String phoneNumber,
            @RequestParam(value = "profilePicture", required = false) MultipartFile profilePicture,
            HttpServletRequest request) {
        int userId = Integer.parseInt(request.getHeader("UserId"));
        Optional<EmployeeEntity> employeeOptional = employeeService.getEmployeeByIdOp(userId);
        if (!employeeOptional.isPresent()) {
            return ResponseEntity.status(404).body("User not found");
        }

        EmployeeEntity employee = employeeOptional.get();
        employee.setFullname(fullname);
        employee.setUsername(username);
        employee.setEmail(email);
        employee.setGender(gender);
        employee.setPhoneNumber(phoneNumber);
        employee.setUpdatedAt(new Date());

        if (profilePicture != null && !profilePicture.isEmpty()) {
            try {
                String imagePath = ImageUtils.saveImage(profilePicture);
                employee.setProfilePicture(imagePath);
            } catch (IOException e) {
                return ResponseEntity.status(500).body("Error saving profile picture");
            }
        }

        employeeService.saveEmployee(employee);
        return ResponseEntity.ok("User updated successfully");
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
    public ResponseEntity<LoginResponse> getCurrentUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        try {
            // Trích xuất tên người dùng từ token
            String username = employeeService.getUsernameFromToken(token);
            // Lấy thông tin người dùng từ tên người dùng
            EmployeeEntity employee = employeeService.getEmployeeByUsername(username);
            if (employee != null) {
                return ResponseEntity.ok(new LoginResponse(employee, null));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new LoginResponse("User not found"));
            }
        } catch (Exception e) {
            // Xử lý lỗi khi giải mã token hoặc tìm người dùng
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse("Invalid or expired token"));
        }
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
    }
}

