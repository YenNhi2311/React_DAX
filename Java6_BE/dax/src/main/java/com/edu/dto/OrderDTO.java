package com.edu.dto;

import java.util.Date;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderDTO {
  private int orderId;
  private int userId;
  private String username;
  private String phone;
  private String email;
  private String address;
  private Date orderDate;
  private String status;
  private Boolean paymentStatus;
  private double shippingFee;
  private double totalAmount;
  private int paymentId;
  private Set<OrderDetailDTO> orderDetails;
  // Getters và Setters
}
