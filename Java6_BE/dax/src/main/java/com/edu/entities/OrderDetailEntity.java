package com.edu.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

<<<<<<< HEAD
<<<<<<< HEAD
=======
import java.math.BigDecimal;

>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
import java.math.BigDecimal;

>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "orderdetails")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderdetail_id")
    private int orderDetailId;

<<<<<<< HEAD
<<<<<<< HEAD
    @Column(name = "price")
    private Double price;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "unit_price")
    private Double unitPrice;
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
  

    private int price;
    private int quantity;
    private BigDecimal unitPrice;
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6

    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonBackReference
    private OrderEntity order;

    @ManyToOne
<<<<<<< HEAD
<<<<<<< HEAD
    @JoinColumn(name = "skus_id")
    private SkusEntity skus;
=======
    @JoinColumn(name = "product_id")
    private ProductEntity product;
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
    @JoinColumn(name = "product_id")
    private ProductEntity product;
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
        // Getters and Setters
    }
    