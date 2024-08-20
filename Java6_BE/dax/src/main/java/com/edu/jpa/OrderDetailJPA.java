package com.edu.jpa;

import com.edu.entities.OrderDetailEntity;
<<<<<<< HEAD
<<<<<<< HEAD

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
=======
import org.springframework.data.jpa.repository.JpaRepository;
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
import org.springframework.data.jpa.repository.JpaRepository;
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailJPA extends JpaRepository<OrderDetailEntity, Integer> {
<<<<<<< HEAD
<<<<<<< HEAD
    @Query(value = "SELECT p.name AS productName, SUM(od.quantity) AS quantitySold, SUM(od.quantity * od.unit_price) AS revenue " +
    "FROM orders o " +
    "JOIN orderdetails od ON o.order_id = od.order_id " +
    "JOIN skus s ON od.skus_id = s.id " +
    "JOIN products p ON s.product_id = p.id " +
    "WHERE MONTH(o.order_date) = :month AND YEAR(o.order_date) = :year " +
    "GROUP BY p.name", nativeQuery = true)
List<Object[]> findMonthlySales(@Param("month") int month, @Param("year") int year);

=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
}
