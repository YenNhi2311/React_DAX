package com.edu.services;

<<<<<<< HEAD
<<<<<<< HEAD
import com.edu.dto.OrderDTO;
import com.edu.dto.OrderDetailDTO;
import com.edu.entities.CartItemEntity;
import com.edu.entities.OrderDetailEntity;
import com.edu.entities.OrderEntity;
import com.edu.jpa.CartItemJPA;
import com.edu.jpa.EmployeeJPA;
import com.edu.jpa.OrderJPA;
import com.edu.jpa.PaymentJPA;
import com.edu.jpa.SkusJPA;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
  @Autowired
  private OrderJPA orderRepository;

  @Autowired
  private PaymentJPA paymentJPA;

  @Autowired
  private EmployeeJPA employeeJPA;

  @Autowired
  private CartItemJPA cartItemRepository;

  @Autowired
  private SkusJPA skusRepository;

  // lưu về sql
  // Lưu đơn hàng và các chi tiết đơn hàng
  @Transactional
  public OrderEntity saveOrder(OrderEntity orderEntity) {
    return orderRepository.save(orderEntity);
  }

  public void clearCartByUserId(int userId) {
    List<CartItemEntity> cartItems = cartItemRepository.findByEmployee_Id(
      userId
    );
    for (CartItemEntity item : cartItems) {
      cartItemRepository.delete(item);
    }
  }

  // public OrderDTO saveOrder1(OrderDTO orderDTO) {
  //     OrderEntity orderEntity = new OrderEntity();
  //     // Chuyển đổi OrderDTO thành OrderEntity
  //     orderEntity.getUser().setId(orderDTO.getUserId());
  //     orderEntity.getPayment().setPaymentId(orderDTO.getPaymentId());
  //     // Các trường khác
  //     orderRepository.save(orderEntity);
  //     return orderDTO;
  // }

  public List<OrderEntity> getAllOrders() {
    List<OrderEntity> orders = orderRepository.findAll();
    // for (OrderEntity order : orders) {
    //   calculateTotalAmount(order);
    // }
    return orders;
  }

  public void updateOrder(OrderEntity order) {
    orderRepository.save(order);
  }

  public OrderEntity getOrderById(int orderId) {
    OrderEntity order = orderRepository.findById(orderId).orElse(null);
    if (order != null) {
      calculateTotalAmount(order);
    }
    return order;
  }

  public OrderEntity getOrderByIdAndByUserId(int orderId, int userId) {
    // Tìm đơn hàng dựa trên orderId và userId
    OrderEntity order = orderRepository.findByUser_IdAndOrderId(
      userId,
      orderId
    );

    if (order != null) {
      // Nếu đơn hàng tồn tại, tính tổng số tiền nếu cần
      calculateTotalAmount(order);
    }

    return order;
  }

  public List<OrderEntity> getOrdersByStatus(String status) {
    List<OrderEntity> orders = orderRepository.findByStatus(status);
    for (OrderEntity order : orders) {
      calculateTotalAmount(order);
    }
    return orders;
  }

  public List<OrderEntity> getOrdersByUserId(int userId) {
    List<OrderEntity> orders = orderRepository.findByUserId(userId);
    // for (OrderEntity order : orders) {
    //   calculateTotalAmount(order);
    // }
    return orders;
  }

  public void deleteOrder(int id) {
    orderRepository.deleteById(id);
  }

  public void updateOrderStatus(List<OrderEntity> orders) {
    for (OrderEntity order : orders) {
      OrderEntity existingOrder = orderRepository
        .findById(order.getOrderId())
        .orElseThrow(() -> new RuntimeException("Order not found"));
      existingOrder.setStatus(order.getStatus());
      orderRepository.save(existingOrder);
    }
  }

  private void calculateTotalAmount(OrderEntity order) {
    double totalAmount = 0.0;
    for (OrderDetailEntity orderDetail : order.getOrderDetails()) {
      totalAmount += orderDetail.getUnitPrice() * orderDetail.getQuantity();
    }
    order.setTotalAmount(totalAmount);
  }

  public void addOrder(OrderEntity order) {
    // Kiểm tra nếu đơn hàng đã tồn tại cho người dùng và mã đơn hàng
    OrderEntity existingOrder = orderRepository.findByUser_IdAndOrderId(
      order.getUser().getId(),
      order.getOrderId()
    );

    if (existingOrder != null) {
      // Nếu đơn hàng đã tồn tại, cập nhật các thông tin cần thiết
      // Ví dụ: cập nhật các thông tin khác của đơn hàng
      orderRepository.save(existingOrder);
    } else {
      // Nếu đơn hàng chưa tồn tại, lưu đơn hàng mới
      orderRepository.save(order);
    }
  }

  public double calculateTotalAmount(Set<OrderDetailEntity> orderDetails) {
    double totalAmount = 0.0;

    for (OrderDetailEntity detail : orderDetails) {
      double itemTotal = detail.getQuantity() * detail.getSkus().getPrice();
      totalAmount += itemTotal;
    }

    return totalAmount;
  }

  // Lưu đơn hàng vào database
  // public void saveOrder(OrderEntity orderEntity) {
  // orderRepository.save(orderEntity);
  // }

  //   @Transactional
  //   public OrderDTO saveOrder(OrderDTO orderDTO) {
  //     OrderEntity order = dtoToEntity(orderDTO);
  //     OrderEntity savedOrder = orderRepository.save(order);

  //     return entityToDto(savedOrder);
  //   }

  //   public OrderDTO getOrderByIdId(int orderId) {
  //     OrderEntity order = orderRepository.findById(orderId).orElse(null);
  //     return order != null ? entityToDto(order) : null;
  //   }

  // Chuyển đổi từ OrderDTO sang OrderEntity

  // Chuyển đổi từ OrderEntity sang OrderDTO
  // public OrderDTO toDto(OrderEntity orderEntity) {
  //   OrderDTO dto = new OrderDTO();
  //   dto.setOrderId(orderEntity.getOrderId());
  //   dto.setOrderDate(orderEntity.getOrderDate());
  //   dto.setTotalAmount(orderEntity.getTotalAmount());
  //   dto.setStatus(orderEntity.getStatus());
  //   dto.setShippingFee(orderEntity.getShippingFee());
  //   dto.setUsername(orderEntity.getUsername());
  //   dto.setPhone(orderEntity.getPhone());
  //   dto.setEmail(orderEntity.getEmail());
  //   dto.setAddress(orderEntity.getAddress());
  //   dto.setUserId(orderEntity.getUser().getId());
  //   dto.setPaymentId(orderEntity.getPayment().getPaymentId());
  //   dto.setOrderDetails(
  //     orderEntity
  //       .getOrderDetails()
  //       .stream()
  //       .map(
  //         od -> {
  //           OrderDetailDTO detailDTO = new OrderDetailDTO();
  //           detailDTO.setOrderDetailId(od.getOrderDetailId());
  //           detailDTO.setSkusId(od.getSkus().getId()); // Assuming you have a Skus entity with skusId field
  //           detailDTO.setPrice(od.getPrice());
  //           detailDTO.setQuantity(od.getQuantity());
  //           detailDTO.setUnitprice(od.getUnitPrice());
  //           return detailDTO;
  //         }
  //       )
  //       .collect(Collectors.toSet())
  //   );
  //   return dto;
  // }

  public OrderDTO toDto(OrderEntity orderEntity) {
    OrderDTO dto = new OrderDTO();
    dto.setOrderId(orderEntity.getOrderId());
    dto.setOrderDate(orderEntity.getOrderDate());
    dto.setTotalAmount(orderEntity.getTotalAmount());
    dto.setStatus(orderEntity.getStatus());
    dto.setPaymentStatus(orderEntity.getPaymentStatus());
    dto.setShippingFee(orderEntity.getShippingFee());
    dto.setUsername(orderEntity.getUsername());
    dto.setPhone(orderEntity.getPhone());
    dto.setEmail(orderEntity.getEmail());
    dto.setAddress(orderEntity.getAddress());
    dto.setUserId(orderEntity.getUser().getId());
    dto.setPaymentId(orderEntity.getPayment().getPaymentId());
    dto.setOrderDetails(
      orderEntity
        .getOrderDetails()
        .stream()
        .map(
          od -> {
            OrderDetailDTO detailDTO = new OrderDetailDTO();
            detailDTO.setOrderDetailId(od.getOrderDetailId());
            detailDTO.setSkusId(od.getSkus().getId()); // Assuming you have a Skus entity with skusId field
            detailDTO.setPrice(od.getPrice());
            detailDTO.setQuantity(od.getQuantity());
            detailDTO.setUnitprice(od.getUnitPrice());
            return detailDTO;
          }
        )
        .collect(Collectors.toSet())
    );
    return dto;
  }

  // public OrderEntity toEntity(OrderDTO orderDTO) {
  //   OrderEntity entity = new OrderEntity();
  //   entity.setOrderId(orderDTO.getOrderId());
  //   entity.setOrderDate(orderDTO.getOrderDate());
  //   entity.setTotalAmount(orderDTO.getTotalAmount());
  //   entity.setStatus(orderDTO.getStatus());
  //   entity.setShippingFee(orderDTO.getShippingFee());
  //   entity.setUsername(orderDTO.getUsername());
  //   entity.setPhone(orderDTO.getPhone());
  //   entity.setEmail(orderDTO.getEmail());
  //   entity.setAddress(orderDTO.getAddress());
  //   // Set user and payment entities from repositories
  //   // Set orderDetails from OrderDetailDTOs
  //   return entity;
  // }

  public OrderEntity toEntity(OrderDTO orderDTO) {
    OrderEntity entity = new OrderEntity();
    entity.setOrderId(orderDTO.getOrderId());
    entity.setOrderDate(orderDTO.getOrderDate());
    entity.setTotalAmount(orderDTO.getTotalAmount());
    entity.setStatus(orderDTO.getStatus());
    entity.setPaymentStatus(orderDTO.getPaymentStatus());
    entity.setShippingFee(orderDTO.getShippingFee());
    entity.setUsername(orderDTO.getUsername());
    entity.setPhone(orderDTO.getPhone());
    entity.setEmail(orderDTO.getEmail());
    entity.setAddress(orderDTO.getAddress());

    // Set user and payment entities from repositories
    entity.setUser(employeeJPA.findById(orderDTO.getUserId()).orElse(null));
    entity.setPayment(
      paymentJPA.findById(orderDTO.getPaymentId()).orElse(null)
    );

    // Set orderDetails from OrderDetailDTOs
    entity.setOrderDetails(
      orderDTO
        .getOrderDetails()
        .stream()
        .map(
          oddto -> {
            OrderDetailEntity detailEntity = new OrderDetailEntity();
            detailEntity.setOrderDetailId(oddto.getOrderDetailId());
            detailEntity.setSkus(
              skusRepository.findById(oddto.getSkusId()).orElse(null)
            ); // Assuming you have a Skus repository
            detailEntity.setPrice(oddto.getPrice());
            detailEntity.setQuantity(oddto.getQuantity());
            detailEntity.setUnitPrice(oddto.getUnitprice());
            detailEntity.setOrder(entity); // Set the order entity for bi-directional relationship
            return detailEntity;
          }
        )
        .collect(Collectors.toSet())
    );
    return entity;
  }

  // public boolean addOrder(int userId, int paymentId, OrderDTO orderDTO) {
  //   try {
  //     OrderEntity orderEntity = toEntity(orderDTO);
  //     orderEntity.setUser(employeeJPA.findById(userId).orElse(null));
  //     orderEntity.setPayment(paymentJPA.findById(paymentId).orElse(null));
  //     orderRepository.save(orderEntity);
  //     return true;
  //   } catch (Exception e) {
  //     e.printStackTrace();
  //     return false;
  //   }
  // }

  public boolean addOrder(int userId, int paymentId, OrderDTO orderDTO) {
    try {
      OrderEntity orderEntity = toEntity(orderDTO);
      orderEntity.setUser(employeeJPA.findById(userId).orElse(null));
      orderEntity.setPayment(paymentJPA.findById(paymentId).orElse(null));
      orderRepository.save(orderEntity);
      return true;
    } catch (Exception e) {
      e.printStackTrace();
      return false;
    }
  }
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import com.edu.entities.OrderEntity;
import com.edu.entities.OrderDetailEntity;
import com.edu.jpa.OrderJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderJPA orderRepository;

    public List<OrderEntity> getAllOrders() {
        List<OrderEntity> orders = orderRepository.findAll();
        for (OrderEntity order : orders) {
            calculateTotalAmount(order);
        }
        return orders;
    }

    public OrderEntity getOrderById(int orderId) {
        OrderEntity order = orderRepository.findById(orderId).orElse(null);
        if (order != null) {
            calculateTotalAmount(order);
        }
        return order;
    }

    public List<OrderEntity> getOrdersByStatus(String status) {
        List<OrderEntity> orders = orderRepository.findByStatus(status);
        for (OrderEntity order : orders) {
            calculateTotalAmount(order);
        }
        return orders;
    }

    public List<OrderEntity> getOrdersByUserId(int userId) {
        List<OrderEntity> orders = orderRepository.findByUserId(userId);
        for (OrderEntity order : orders) {
            calculateTotalAmount(order);
        }
        return orders;
    }

    public OrderEntity saveOrder(OrderEntity order) {
        calculateTotalAmount(order);
        return orderRepository.save(order);
    }

    public void deleteOrder(int id) {
        orderRepository.deleteById(id);
    }

    public void updateOrderStatus(List<OrderEntity> orders) {
        for (OrderEntity order : orders) {
            OrderEntity existingOrder = orderRepository.findById(order.getOrderId()).orElse(null);
            if (existingOrder != null) {
                existingOrder.setStatus(order.getStatus());
                orderRepository.save(existingOrder);
            }
        }
    }

    private void calculateTotalAmount(OrderEntity order) {
        BigDecimal totalAmount = BigDecimal.ZERO;
        for (OrderDetailEntity orderDetail : order.getOrderDetails()) {
            totalAmount = totalAmount.add(orderDetail.getUnitPrice().multiply(BigDecimal.valueOf(orderDetail.getQuantity())));
        }
        order.setTotalAmount(totalAmount);
    }
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
}
