package com.edu.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

<<<<<<< HEAD
<<<<<<< HEAD
import com.fasterxml.jackson.annotation.JsonIgnore;
=======
import com.fasterxml.jackson.annotation.JsonManagedReference;
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
import com.fasterxml.jackson.annotation.JsonManagedReference;
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6

import jakarta.persistence.*;

@Entity
@Table(name = "categories")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
<<<<<<< HEAD
<<<<<<< HEAD
    @Column(name ="category_id" )
    private int categoryId;

    @Column(name ="category_name" )
    private String categoryName;

    @Column(name ="description" )
    private String description;

    @Column(name = "img")
    private String img;

    @OneToMany(mappedBy = "category")
    @JsonIgnore
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
    private int categoryId;

    private String categoryName;
    private String description;

    @OneToMany(mappedBy = "category")
    @JsonManagedReference
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
    private Set<ProductEntity> products;
}
