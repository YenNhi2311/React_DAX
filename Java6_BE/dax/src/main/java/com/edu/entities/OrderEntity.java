package com.edu.entities;

<<<<<<< HEAD
<<<<<<< HEAD
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
@Entity
@Table(name = "orders")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderEntity {
<<<<<<< HEAD
<<<<<<< HEAD
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "order_id")
  private int orderId;

  @Column(name = "order_date")
  private Date orderDate;

  @Column(name = "total_amount")
  private Double totalAmount;

  @Column(name = "status")
  private String status;

  @Column(name = "shipping_fee")
  private Double shippingFee;

  @Column(name = "payment_status")
  private Boolean paymentStatus;

  @Column(name = "username")
  private String username;

  @Column(name = "phone")
  private String phone;

  @Column(name = "email")
  private String email;

  @Column(name = "address")
  private String address;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private EmployeeEntity user;

  @ManyToOne
  @JoinColumn(name = "payment_id")
  private PaymentEntity payment;

  @OneToMany(
    mappedBy = "order",
    cascade = CascadeType.ALL,
    orphanRemoval = true
  )
  @JsonManagedReference
  private Set<OrderDetailEntity> orderDetails;
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId;

    private Date orderDate;
    private BigDecimal totalAmount;
    private String status;
    private BigDecimal shippingFee;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private EmployeeEntity user;

    @ManyToOne
    @JoinColumn(name = "payment_id")
    private PaymentEntity payment;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private AddressEntity address;

    @OneToMany(mappedBy = "order", fetch = FetchType.EAGER) // Cập nhật FetchType nếu cần
    @JsonManagedReference
    private Set<OrderDetailEntity> orderDetails;
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
}
