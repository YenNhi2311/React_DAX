package com.edu.entities;

import java.util.Set;
<<<<<<< HEAD
<<<<<<< HEAD
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "attributes_option")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======

>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
public class AttributeOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
<<<<<<< HEAD
<<<<<<< HEAD
    @Column(name = "id")
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
    private int id;

    @ManyToOne
    @JoinColumn(name = "attributes_id")
    private AttributeEntity attributes ;

<<<<<<< HEAD
<<<<<<< HEAD
    @Column(name = "value")
    private String value;

    @Column(name = "img")
=======
    private String value;
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
    private String value;
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
    private String img;


    @OneToMany(mappedBy = "attributeOption")
    @JsonIgnore
    private Set<AttributesSkusEntity> attributesOptionSkus;
}
