package com.edu.entities;

<<<<<<< HEAD
<<<<<<< HEAD
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;

<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import lombok.Setter;

@Entity
@Table(name = "skus")
@Getter
@Setter
@AllArgsConstructor
<<<<<<< HEAD
<<<<<<< HEAD
@NoArgsConstructor
public class SkusEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "code")
    private String code;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private ProductEntity product;

    @Column(name = "price")
    private Double price;

    @OneToMany(mappedBy = "skus")
    @JsonManagedReference
    private Set<AttributesSkusEntity> attributesSkus;

    @OneToMany(mappedBy = "skus")
    @JsonIgnore
    private Set<OrderDetailEntity> orderDetail;

    @OneToMany(mappedBy = "skus")
    @JsonIgnore
    private Set<CartItemEntity> cartItem;
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6

public class SkusEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String code;


    @ManyToOne
    @JoinColumn(name = "product_id")
    private ProductEntity product ;


    private Double price;


     @OneToMany(mappedBy = "skus")
    @JsonIgnore
    private Set<AttributesSkusEntity> attributesOptionSkus;

<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
}
