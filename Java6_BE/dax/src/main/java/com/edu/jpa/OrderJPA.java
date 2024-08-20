package com.edu.jpa;

import com.edu.entities.OrderEntity;
<<<<<<< HEAD
<<<<<<< HEAD
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;

<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import org.springframework.stereotype.Repository;

@Repository
public interface OrderJPA extends JpaRepository<OrderEntity, Integer> {
<<<<<<< HEAD
<<<<<<< HEAD
  List<OrderEntity> findByStatus(String status);
  List<OrderEntity> findByUserId(int userId);

  OrderEntity findByUser_IdAndOrderId(Integer userId, Integer orderId);

  // @Query("SELECT COUNT(o) AS totalOrders, SUM(o.totalAmount) AS totalRevenue FROM OrderEntity o")
  // Map<String, Object> findOrderStatistics();

  //  @Query("SELECT COUNT(o) FROM OrderEntity o")
  // long countTotalOrders();

  // @Query("SELECT SUM(o.totalAmount) FROM OrderEntity o")
  // long getTotalRevenue();

  long countByStatusNot(String status);

  @Query(
    "SELECT COALESCE(SUM(o.totalAmount), 0) FROM OrderEntity o WHERE o.status != :status"
  )
  long sumRevenueByStatusNot(@Param("status") String status);

  @Query(
    value = "SELECT o.order_id, SUM(od.quantity) AS total_quantity_sold, SUM(od.unit_price * od.quantity) AS total_revenue " +
    "FROM orders o " +
    "JOIN order_details od ON o.order_id = od.order_id " +
    "WHERE EXTRACT(MONTH FROM o.order_date) = :month " +
    "GROUP BY o.order_id",
    nativeQuery = true
  )
  List<Object[]> findOrdersSoldByMonth(@Param("month") int month);

  @Query(
    value = "SELECT SUM(od.unit_price * od.quantity) AS total_revenue " +
    "FROM orders o " +
    "JOIN order_details od ON o.order_id = od.order_id " +
    "WHERE EXTRACT(MONTH FROM o.order_date) = :month",
    nativeQuery = true
  )
  Double findTotalRevenueByMonth(@Param("month") int month);

  @Query(
    "SELECT o.status, SUM(o.totalAmount) as totalRevenue " +
    "FROM OrderEntity o " +
    "WHERE FUNCTION('MONTH', o.orderDate) = :month " +
    "AND FUNCTION('YEAR', o.orderDate) = :year " +
    "GROUP BY o.status"
  )
  List<Object[]> findTotalRevenueByStatusAndMonthAndYear(
    @Param("month") int month,
    @Param("year") int year
  );
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
    List<OrderEntity> findByStatus(String status);
    List<OrderEntity> findByUserId(int userId);
    // @Query("SELECT COUNT(o) AS totalOrders, SUM(o.totalAmount) AS totalRevenue FROM OrderEntity o")
    // Map<String, Object> findOrderStatistics();
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
}
