package com.edu.entities;

<<<<<<< HEAD
<<<<<<< HEAD
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
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

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;


<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
@Entity
@Table(name = "products")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductEntity {
<<<<<<< HEAD
<<<<<<< HEAD
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Column(name = "name")
  private String name;

  @Column(name = "description")
  private String description;

  @Column(name = "img_url")
  private String imgUrl;

  @Column(name = "created_at")
  private LocalDateTime createdAt;

  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

  @ManyToOne
  @JoinColumn(name = "category_id")
  private CategoryEntity category;

  @OneToMany(mappedBy = "product")
  @JsonIgnore
  private Set<SkusEntity> skus;

  @OneToMany(mappedBy = "product")
  @JsonManagedReference
  private Set<ReviewEntity> reviews;

  @OneToMany(mappedBy = "product")
  @JsonIgnore
  private Set<ProductPromotionEntity> productPromotion;
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6

     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String description;
    private BigDecimal price;
    private String imgUrl;
    private Date createdAt;
    private Date updatedAt;

    

    @ManyToOne
    @JoinColumn(name = "promotion_id")
    private PromotionEntity promotion;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonBackReference
    private CategoryEntity category;



    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private Set<SkusEntity> skus;

    @OneToMany(mappedBy = "product")
    @JsonManagedReference
    private Set<RatingEntity> ratings;

    @OneToMany(mappedBy = "product")
    @JsonManagedReference
    private Set<ReviewEntity> reviews;


    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private Set<OrderDetailEntity> orderDetails;

<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
}
