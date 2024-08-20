package com.edu.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.edu.entities.EmployeeEntity;
import com.edu.entities.OrderEntity;
import com.edu.services.EmployeeService;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin("*")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public List<EmployeeEntity> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeEntity> getEmployeeById(@PathVariable("id") int id) {
        EmployeeEntity employee = employeeService.getEmployeeById(id);
        if (employee != null) {
            return ResponseEntity.ok(employee);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<EmployeeEntity> addEmployee(@RequestBody EmployeeEntity employee){
        EmployeeEntity addedEmployee = employeeService.saveEmployee(employee);
        return new ResponseEntity<>(addedEmployee, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeEntity> updateEmployee(@PathVariable("id") int id,
            @RequestBody EmployeeEntity employee) {
        EmployeeEntity updatedEmployee = employeeService.updateEmployee(id, employee);
        if (updatedEmployee != null) {
            return ResponseEntity.ok(updatedEmployee);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Khóa nhân viên
    @PutMapping("/{id}/lock")
    public ResponseEntity<Void> lockEmployee(@PathVariable int id) {
        employeeService.lockEmployee(id);
        return ResponseEntity.noContent().build();
    }

    // Mở khóa nhân viên
    @PutMapping("/{id}/unlock")
    public ResponseEntity<Void> unlockEmployee(@PathVariable int id) {
        employeeService.unlockEmployee(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update")
    public ResponseEntity<EmployeeEntity> updateLoggedInEmployee(@RequestBody EmployeeEntity employee) {
        // Lấy tên đăng nhập từ token hoặc cơ chế xác thực khác
        String username = "get-username-from-token"; // Thay thế bằng cách lấy tên đăng nhập từ token

        EmployeeEntity updatedEmployee = employeeService.updateLoggedInEmployee(username, employee);
        if (updatedEmployee != null) {
            return ResponseEntity.ok(updatedEmployee);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/updateStatus")
public ResponseEntity<String> updateOrderStatus(@RequestBody List<Map<String, Object>> orders) {
    try {
        for (Map<String, Object> order : orders) {
            int id = (int) order.get("id");
            boolean status = Boolean.parseBoolean(order.get("status").toString()); // Ensure correct type conversion

            System.out.println("Updating employee with ID: " + id + " to status: " + status);
            EmployeeEntity employee = employeeService.getEmployeeById(id);
            if (employee != null) {
                employee.setStatus(status);
                employeeService.saveEmployee(employee);
                System.out.println("Employee updated successfully: " + employee);
            } else {
                System.out.println("Employee not found with ID: " + id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found with ID: " + id);
            }
        }
        return ResponseEntity.ok("Cập nhật thành công");
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Cập nhật không thành công: " + e.getMessage());
    }
}


    
}
