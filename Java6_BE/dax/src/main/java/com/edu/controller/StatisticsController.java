<<<<<<< HEAD
<<<<<<< HEAD
package com.edu.controller;

import com.edu.services.StatisticsService;
import java.util.Collections;
import java.util.List;
// import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/statistics")
public class StatisticsController {
  @Autowired
  private StatisticsService statisticsService;

  @GetMapping("/products")
  public long getProductCount() {
    return statisticsService.getTotalProducts();
  }

  @GetMapping("/orders")
  public long getOrderCount() {
    return statisticsService.getTotalOrders();
  }

  @GetMapping("/customers")
  public long getCustomerCount() {
    return statisticsService.getTotalCustomers();
  }

  @GetMapping("/revenue")
  public long getRevenue() {
    return statisticsService.getTotalRevenue();
  }

  @GetMapping("/monthlySales")
  public ResponseEntity<List<Object[]>> getMonthlySales(
    @RequestParam("month") int month,
    @RequestParam("year") int year
  ) {
    try {
      List<Object[]> monthlySales = statisticsService.getMonthlySales(
        month,
        year
      );
      return ResponseEntity.ok(monthlySales);
    } catch (Exception e) {
      // Log the exception (you can use a logger here)
      e.printStackTrace();
      // Return an error response
      return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(Collections.emptyList());
    }
  }

  @GetMapping("/revenue-by-status")
  public ResponseEntity<List<Object[]>> getRevenueByStatus(
    @RequestParam int month,
    @RequestParam int year
  ) {
    List<Object[]> revenueData = statisticsService.getRevenueByStatus(
      month,
      year
    );
    return ResponseEntity.ok(revenueData);
  }
}
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
// package com.edu.controller;

// import java.util.List;
// import java.util.Map;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.edu.services.StatisticsService;

// @RestController
// @RequestMapping("/api/statistics")
// public class StatisticsController {

//     @Autowired
//     private StatisticsService statisticsService;

//     @GetMapping("/products")
//     public List<Map<String, Object>> getProductStatistics() {
//         return statisticsService.getProductStatistics();
//     }

//     @GetMapping("/orders")
//     public Map<String, Object> getOrderStatistics() {
//         return statisticsService.getOrderStatistics();
//     }

//     @GetMapping("/customers")
//     public List<Map<String, Object>> getCustomerStatistics() {
//         return statisticsService.getCustomerStatistics();
//     }
// }
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
