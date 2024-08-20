package com.edu.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edu.entities.CartItemEntity;
import com.edu.entities.EmployeeEntity;
import com.edu.entities.SkusEntity;

@Repository
public interface CartItemJPA extends JpaRepository<CartItemEntity, Integer> {
    // Find cart item by Employee and Skus
    CartItemEntity findByEmployeeAndSkus(EmployeeEntity employee, SkusEntity skus);

    // Find cart items by Employee
    List<CartItemEntity> findByEmployee(EmployeeEntity employee);

    // Find cart items by Employee ID and Skus ID
    CartItemEntity findByEmployee_IdAndSkus_Id(int employeeId, int skusId);

    // Find cart items by Employee ID
    List<CartItemEntity> findByEmployee_Id(int userId);
}
