package com.edu.controller;

<<<<<<< HEAD
<<<<<<< HEAD
import com.edu.dto.OrderDTO;
import com.edu.entities.*;
import com.edu.services.*;
import java.util.Collections;
import java.util.List;
import java.util.Map;
=======
import java.util.List;

>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
import java.util.List;

>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

<<<<<<< HEAD
<<<<<<< HEAD
=======
import com.edu.entities.OrderEntity;
import com.edu.services.OrderService;

>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
import com.edu.entities.OrderEntity;
import com.edu.services.OrderService;

>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
@CrossOrigin("*")
@RestController
@RequestMapping("/api/orders")
public class OrderController {
<<<<<<< HEAD
<<<<<<< HEAD
  @Autowired
  private OrderService orderService;

  @Autowired
  private OrderDetailService orderDetailService;

  @Autowired
  private CartItemService cartItemService;

  @Autowired
  private EmployeeService employeeService;

  @Autowired
  private SkuService skuService;

  @Autowired
  private PaymentService paymentService;

  // Lấy tất cả các đơn hàng
  @GetMapping
  public ResponseEntity<List<OrderEntity>> getAllOrders() {
    try {
      List<OrderEntity> orders = orderService.getAllOrders();
      return ResponseEntity.ok(orders);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // Lấy đơn hàng theo ID
  @GetMapping("/{id}")
  public ResponseEntity<OrderEntity> getOrderById(@PathVariable int id) {
    try {
      OrderEntity order = orderService.getOrderById(id);
      if (order != null) {
        return ResponseEntity.ok(order);
      } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
      }
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // Lấy đơn hàng theo userId
  @GetMapping("/user/{userId}")
  public ResponseEntity<List<OrderEntity>> getOrdersByUserId(
    @PathVariable int userId
  ) {
    try {
      List<OrderEntity> orders = orderService.getOrdersByUserId(userId);
      return ResponseEntity.ok(orders);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // Lấy tất cả các chi tiết đơn hàng
  @GetMapping("/detail")
  public ResponseEntity<List<OrderDetailEntity>> getOrderDetails() {
    try {
      List<OrderDetailEntity> orderDetails = orderDetailService.getAllOrderDetails();
      return ResponseEntity.ok(orderDetails);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // Cập nhật trạng thái đơn hàng
  @PostMapping("/updateStatus")
  public ResponseEntity<String> updateOrderStatus(
    @RequestBody List<OrderEntity> orders
  ) {
    try {
      System.out.println("Received orders: " + orders); // Log nội dung của orders
      orderService.updateOrderStatus(orders);
      return ResponseEntity.ok("Cập nhật thành công");
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body("Cập nhật không thành công");
    }
  }

  // Cập nhật trạng thái đơn hàng cụ thể
  @PutMapping("/{orderId}")
  public ResponseEntity<String> updateOrderStatus(
    @PathVariable int orderId,
    @RequestBody Map<String, String> payload
  ) {
    try {
      OrderEntity order = orderService.getOrderById(orderId);
      if (order == null) {
        return ResponseEntity
          .status(HttpStatus.NOT_FOUND)
          .body("Đơn hàng không tồn tại.");
      }

      String status = payload.get("status");
      if (status == null) {
        return ResponseEntity
          .status(HttpStatus.BAD_REQUEST)
          .body("Trạng thái không hợp lệ.");
      }

      if (status.equals("Đã hủy") && "Chờ xác nhận".equals(order.getStatus())) {
        order.setStatus("Đã hủy");
        order.setPaymentStatus(false);
      } else if (
        status.equals("Đã nhận") && "Đang vận chuyển".equals(order.getStatus())
      ) {
        order.setStatus("Đã nhận");
        if (order.getPayment().isPaymentType() == true) {
          order.setPaymentStatus(true);
        }
      } else {
        return ResponseEntity
          .status(HttpStatus.BAD_REQUEST)
          .body("Trạng thái không hợp lệ.");
      }

      orderService.updateOrder(order);
      return ResponseEntity.ok(
        "Trạng thái đơn hàng đã được cập nhật thành công."
      );
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body("Không thể cập nhật trạng thái đơn hàng.");
    }
  }

  // Lấy đơn hàng theo trạng thái
  @GetMapping("/status")
  public ResponseEntity<List<OrderEntity>> getOrdersByStatus(
    @RequestParam String status
  ) {
    try {
      List<OrderEntity> orders = orderService.getOrdersByStatus(status);
      return ResponseEntity.ok(orders);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // Xóa đơn hàng
  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteOrder(@PathVariable int id) {
    try {
      orderService.deleteOrder(id);
      return ResponseEntity.ok("Xóa đơn hàng thành công");
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body("Xóa đơn hàng không thành công");
    }
  }

  // Lấy tất cả các mục trong giỏ hàng theo userId
  @GetMapping("/carts/{userId}")
  public ResponseEntity<List<CartItemEntity>> getCartItemsByUserId(
    @PathVariable int userId
  ) {
    try {
      List<CartItemEntity> cartItems = cartItemService.getCartItemsByUserId(
        userId
      );
      return ResponseEntity.ok(cartItems);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(Collections.emptyList());
    }
  }

  // Cập nhật số lượng mục trong giỏ hàng
  @PostMapping("/cart/update/{userId}/{skusId}/{productId}/{quantity}")
  public ResponseEntity<String> updateCartItemQuantity(
    @PathVariable int userId,
    @PathVariable int skusId,
    @PathVariable int productId,
    @PathVariable int quantity
  ) {
    try {
      cartItemService.updateCartItemQuantity(
        userId,
        skusId,
        productId,
        quantity
      );
      return ResponseEntity.ok("Cập nhật số lượng sản phẩm thành công.");
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body("Không thể cập nhật số lượng sản phẩm.");
    }
  }

  // Xóa toàn bộ giỏ hàng của người dùng
  @DeleteMapping("/carts/{userId}")
  public ResponseEntity<String> clearCart(@PathVariable int userId) {
    try {
      cartItemService.clearCartByUserId(userId); // Thay đổi phương thức xóa giỏ hàng
      return ResponseEntity.ok("Xóa giỏ hàng thành công");
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body("Xóa giỏ hàng không thành công");
    }
  }

  // Thêm sản phẩm vào giỏ hàng
  @PostMapping("/cart/add/{userId}/{skusId}/{productId}/{quantity}")
  public ResponseEntity<String> addToCart(
    @PathVariable int userId,
    @PathVariable int skusId,
    @PathVariable int productId,
    @PathVariable int quantity
  ) {
    try {
      EmployeeEntity user = employeeService.getEmployeeById(userId);
      if (user == null) {
        return ResponseEntity
          .status(HttpStatus.NOT_FOUND)
          .body("User không tồn tại.");
      }

      List<SkusEntity> skusList = skuService.getSkusByProductIdAndSkuId(
        productId,
        skusId
      );
      if (skusList == null || skusList.isEmpty()) {
        return ResponseEntity
          .status(HttpStatus.NOT_FOUND)
          .body("Sản phẩm không tồn tại.");
      }

      SkusEntity skus = skusList.get(0);
      CartItemEntity cartItem = new CartItemEntity();
      cartItem.setEmployee(user);
      cartItem.setSkus(skus);
      cartItem.setQuantity(quantity);

      cartItemService.addCartItem(cartItem);
      return ResponseEntity
        .status(HttpStatus.CREATED)
        .body("Thêm sản phẩm vào giỏ hàng thành công.");
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body("Không thể thêm sản phẩm vào giỏ hàng.");
    }
  }

  // Thêm hóa đơn
  @PostMapping("/add/{userId}/{paymentId}")
  public ResponseEntity<String> addOrder(
    @PathVariable("userId") int userId,
    @PathVariable("paymentId") int paymentId,
    @RequestBody OrderDTO orderEntity
  ) {
    if (orderEntity.getPaymentId() == 1) {
      orderEntity.setPaymentStatus(true);
    } else {
      orderEntity.setPaymentStatus(false);
    }
    boolean isSuccess = orderService.addOrder(userId, paymentId, orderEntity);
    if (isSuccess) {
      return new ResponseEntity<>(
        "Order added successfully!",
        HttpStatus.CREATED
      );
    } else {
      return new ResponseEntity<>(
        "Failed to add order.",
        HttpStatus.BAD_REQUEST
      );
    }
  }
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
    
    @Autowired
    private OrderService orderService;

    // Get all orders
    @GetMapping
    public List<OrderEntity> getAllOrders() {
        return orderService.getAllOrders();
    }

    // Get order by ID
    @GetMapping("/{id}")
    public ResponseEntity<OrderEntity> getOrderById(@PathVariable int id) {
        OrderEntity order = orderService.getOrderById(id);
        if (order != null) {
            return ResponseEntity.ok(order);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Create a new order
    @PostMapping
    public ResponseEntity<OrderEntity> createOrder(@RequestBody OrderEntity order) {
        try {
            OrderEntity savedOrder = orderService.saveOrder(order);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Update order status
    @PostMapping("/updateStatus")
    public ResponseEntity<String> updateOrderStatus(@RequestBody List<OrderEntity> orders) {
        try {
            orderService.updateOrderStatus(orders);
            return ResponseEntity.ok("Cập nhật thành công");
        } catch (Exception e) {
            e.printStackTrace(); // In ra lỗi nếu có
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Cập nhật không thành công");
        }
    }

    // Get orders by status
    @GetMapping("/status")
    public ResponseEntity<List<OrderEntity>> getOrdersByStatus(@RequestParam String status) {
        try {
            List<OrderEntity> orders = orderService.getOrdersByStatus(status);
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            e.printStackTrace(); // In ra lỗi nếu có
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Delete an order
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable int id) {
        try {
            orderService.deleteOrder(id);
            return ResponseEntity.ok("Xóa đơn hàng thành công");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Xóa đơn hàng không thành công");
        }
    }
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
}
