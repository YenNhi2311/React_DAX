<<<<<<< HEAD
<<<<<<< HEAD
package com.edu.services;

import com.edu.entities.OrderDetailEntity;
import com.edu.jpa.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatisticsService {
  @Autowired
  private OrderJPA orderRepository;

  @Autowired
  private OrderDetailJPA orderDetailRepository;

  @Autowired
  private ProductJPA productRepository;

  @Autowired
  private EmployeeJPA customerRepository;

  @Autowired
  private CategoryJPA categoryJPA;

  public long getTotalProducts() {
    return productRepository.count();
  }

  public long getTotalOrders() {
    // Loại trừ các đơn hàng đã hủy
    return orderRepository.countByStatusNot("Đã hủy");
  }

  public long getTotalCustomers() {
    return customerRepository.count();
  }

  public long getTotalRevenue() {
    // Giả sử bạn tính doanh thu dựa trên các đơn hàng không bị hủy
    return orderRepository.sumRevenueByStatusNot("Đã hủy");
  }

  public List<Object[]> getMonthlySales(int month, int year) {
    return orderDetailRepository.findMonthlySales(month, year);
  }

  public List<Object[]> getRevenueByStatus(int month, int year) {
    return orderRepository.findTotalRevenueByStatusAndMonthAndYear(month, year);
  }
}
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6

// package com.edu.services;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.edu.jpa.*;

// import java.util.List;
// import java.util.Map;

// @Service
// public class StatisticsService {

//     @Autowired
//     private OrderJPA orderRepository;

//     @Autowired
//     private ProductJPA productRepository;

//     @Autowired
//     private EmployeeJPA customerRepository;

//     public List<Map<String, Object>> getProductStatistics() {
//         return productRepository.findProductStatistics();
//     }

//     public Map<String, Object> getOrderStatistics() {
//         return orderRepository.findOrderStatistics();
//     }

//     public List<Map<String, Object>> getCustomerStatistics() {
//         return customerRepository.findCustomerStatistics();
//     }
// }
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
