package com.edu.entities;


import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "address")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddressEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String addressName;

    @OneToMany(mappedBy = "address")
<<<<<<< HEAD
<<<<<<< HEAD
    @JsonIgnore
    private Set<EmployeeEntity> employees;

=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
    @JsonManagedReference
    private Set<EmployeeEntity> employees;

    @OneToMany(mappedBy = "address")
    @JsonIgnore
    private Set<OrderEntity> orders;
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6

}
