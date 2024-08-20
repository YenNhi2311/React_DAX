package com.edu.services;

import com.edu.entities.EmployeeEntity;
import com.edu.jpa.EmployeeJPA;
<<<<<<< HEAD
<<<<<<< HEAD

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6

@Service
public class EmployeeService {

    @Autowired
    private EmployeeJPA employeeRepository;

    // Phương thức lấy tất cả nhân viên
    public List<EmployeeEntity> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Phương thức lấy nhân viên theo ID
    public EmployeeEntity getEmployeeById(int id) {
        return employeeRepository.findById(id).orElse(null);
    }

<<<<<<< HEAD
<<<<<<< HEAD
    public Optional<EmployeeEntity> getEmployeeByIdOp(int id) {
        return employeeRepository.findById(id);
    }

    // Phương thức lưu nhân viên mới hoặc cập nhật thông tin nhân viên
    public EmployeeEntity saveEmployee(EmployeeEntity employee) {
        employee.setCreatedAt(new Date());
=======
    // Phương thức lưu nhân viên mới hoặc cập nhật thông tin nhân viên
    public EmployeeEntity saveEmployee(EmployeeEntity employee) {
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
    // Phương thức lưu nhân viên mới hoặc cập nhật thông tin nhân viên
    public EmployeeEntity saveEmployee(EmployeeEntity employee) {
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
        return employeeRepository.save(employee);
    }

    // Phương thức xóa nhân viên theo ID
    public void deleteEmployee(int id) {
        employeeRepository.deleteById(id);
    }

    // Phương thức xác thực nhân viên dựa trên tên đăng nhập và mật khẩu
    public EmployeeEntity authenticate(String username, String password) {
        EmployeeEntity employee = employeeRepository.findByUsernameAndPassword(username, password);
        if (employee != null && password.equals(employee.getPassword())) {
            return employee;
        }
        return null;
    }

    // Phương thức tạo token cho nhân viên (cần triển khai thêm logic)
    public String generateToken(EmployeeEntity employee) {
        // Implement token generation logic here, for example using JWT
        return "generated-jwt-token";
    }

    // Phương thức lấy tên đăng nhập từ token (cần triển khai thêm logic)
    public String getUsernameFromToken(String token) {
        // Implement token parsing logic here, for example using JWT
        return "parsed-username-from-token";
    }

    // Phương thức lấy nhân viên dựa trên tên đăng nhập
    public EmployeeEntity getEmployeeByUsername(String username) {
        return employeeRepository.findByUsername(username);
    }
<<<<<<< HEAD
<<<<<<< HEAD
    
    // Phương thức cập nhật thông tin nhân viên
    public EmployeeEntity updateEmployee(int id, EmployeeEntity employee) {
        if (employeeRepository.existsById(id)) {
            employee.setId(id); // Đảm bảo ID của nhân viên được cập nhật
            employee.setUpdatedAt(new Date()); // Set updatedAt khi cập nhật
            return employeeRepository.save(employee);
        }
        return null; // Hoặc throw exception nếu không tìm thấy
    }

    // Phương thức khóa nhân viên
    public void lockEmployee(int id) {
        EmployeeEntity employee = employeeRepository.findById(id).orElse(null);
        if (employee != null) {
            employee.setStatus(Boolean.TRUE); // Đặt trạng thái là bị khóa
            employeeRepository.save(employee);
        }
    }

    // Phương thức kích hoạt nhân viên
    public void unlockEmployee(int id) {
        EmployeeEntity employee = employeeRepository.findById(id).orElse(null);
        if (employee != null) {
            employee.setStatus(Boolean.FALSE); // Đặt trạng thái là hoạt động bình thường
            employeeRepository.save(employee);
        }
    }

    public EmployeeEntity updateLoggedInEmployee(String username, EmployeeEntity updatedEmployee) {
        EmployeeEntity existingEmployee = employeeRepository.findByUsername(username);
        if (existingEmployee != null) {
            existingEmployee.setFullname(updatedEmployee.getFullname());
            existingEmployee.setEmail(updatedEmployee.getEmail());
            existingEmployee.setPhoneNumber(updatedEmployee.getPhoneNumber());
            existingEmployee.setGender(updatedEmployee.getGender());
            existingEmployee.setUpdatedAt(new Date()); // Set updatedAt khi cập nhật
            return employeeRepository.save(existingEmployee);
        }
        return null; // Hoặc throw exception nếu không tìm thấy
    }

    public void updateUserStatus(List<EmployeeEntity> employees) {
        for (EmployeeEntity employee : employees) {
            EmployeeEntity existingEmployee = employeeRepository.findById(employee.getId()).orElse(null);
            if (existingEmployee != null) {
                existingEmployee.setStatus(employee.getStatus());
                employeeRepository.save(existingEmployee);
            }
        }
    }
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
}
