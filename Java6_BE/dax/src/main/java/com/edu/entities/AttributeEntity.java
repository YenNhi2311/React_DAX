package com.edu.entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

<<<<<<< HEAD
<<<<<<< HEAD
import jakarta.persistence.Column;
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "attributes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AttributeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
<<<<<<< HEAD
<<<<<<< HEAD
    @Column(name = "id")
    private int id;

     @Column(name = "name")
=======
    private int id;

>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
    private int id;

>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
    private String name;

    @OneToMany(mappedBy = "attributes")
    @JsonIgnore
    private Set<AttributeOption> attributeOption;
}
