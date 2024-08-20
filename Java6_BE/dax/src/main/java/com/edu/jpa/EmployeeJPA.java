package com.edu.jpa;

import com.edu.entities.EmployeeEntity;

import java.util.List;
<<<<<<< HEAD
<<<<<<< HEAD
=======
import java.util.Map;
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
import java.util.Map;
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeJPA extends JpaRepository<EmployeeEntity, Integer> {
    EmployeeEntity findByUsernameAndPassword(String username, String password);
    EmployeeEntity findByUsername(String username);
<<<<<<< HEAD
<<<<<<< HEAD
    EmployeeEntity findByStatus(Boolean status);
    @Query("SELECT COUNT(c) FROM EmployeeEntity c")
    long countTotalCustomers();
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
}
