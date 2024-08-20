package com.edu.jpa;

import com.edu.entities.ProductEntity;

<<<<<<< HEAD
<<<<<<< HEAD
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
=======

import org.springframework.data.jpa.repository.JpaRepository;

>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======

import org.springframework.data.jpa.repository.JpaRepository;

>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import org.springframework.stereotype.Repository;

@Repository
public interface ProductJPA extends JpaRepository<ProductEntity, Integer> {
    // @Query("SELECT p.id AS productId, p.name AS productName, SUM(oi.quantity) AS totalQuantitySold, SUM(oi.quantity * oi.unitPrice) AS totalRevenue FROM OrderDetailEntity oi JOIN oi.product p GROUP BY p.id, p.name ORDER BY totalRevenue DESC")
    // List<Map<String, Object>> findProductStatistics();
<<<<<<< HEAD
<<<<<<< HEAD
    @Query("SELECT COUNT(p) FROM ProductEntity p")
    long countTotalProducts();

    List<ProductEntity> findByNameContainingIgnoreCase(String name);
    
    List<ProductEntity> findTop3ByOrderByCreatedAtDesc();

=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
}
