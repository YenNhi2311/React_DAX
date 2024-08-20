package com.edu.controller;

import com.edu.entities.EmployeeEntity;
import com.edu.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class RegisterController {
<<<<<<< HEAD
<<<<<<< HEAD
  @Autowired
  private EmployeeService employeeService;

  @PostMapping("/register")
  public EmployeeEntity registerEmployee(@RequestBody EmployeeEntity employee) {
    // Đảm bảo vai trò được đặt là 'user' theo mặc định
    employee.setRole(false); // Giả định 'false' có nghĩa là 'user'
    employee.setStatus(true);
    return employeeService.saveEmployee(employee);
  }
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/register")
    public EmployeeEntity registerEmployee(@RequestBody EmployeeEntity employee) {
        // Đảm bảo vai trò được đặt là 'user' theo mặc định
        employee.setRole(false); // Giả định 'false' có nghĩa là 'user'
        return employeeService.saveEmployee(employee);
    }
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
}
