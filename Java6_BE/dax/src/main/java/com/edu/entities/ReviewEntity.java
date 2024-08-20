package com.edu.entities;

<<<<<<< HEAD
<<<<<<< HEAD
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
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

import com.fasterxml.jackson.annotation.JsonBackReference;

<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
@Entity
@Table(name = "reviews")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewEntity {
<<<<<<< HEAD
<<<<<<< HEAD
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private int id;

  @Column(name = "comment")
  private String comment;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private EmployeeEntity employee;

  @ManyToOne
  @JoinColumn(name = "product_id")
  @JsonBackReference
  private ProductEntity product;
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String comment;
    private Date createdAt;
    private Date updatedAt;
    private String reviewContent;
    private BigDecimal reviewRating;
    private Date reviewTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private EmployeeEntity employee;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonBackReference
    private ProductEntity product;
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
}
