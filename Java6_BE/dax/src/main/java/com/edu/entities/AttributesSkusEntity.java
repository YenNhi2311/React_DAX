package com.edu.entities;

<<<<<<< HEAD
<<<<<<< HEAD
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
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
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "attributesa_option_skus")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AttributesSkusEntity {

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
    @JoinColumn(name = "skus_id")
<<<<<<< HEAD
<<<<<<< HEAD
    @JsonBackReference
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
    private SkusEntity skus;

    @ManyToOne
    @JoinColumn(name = "attributes_option_id")
<<<<<<< HEAD
<<<<<<< HEAD
    @JsonBackReference
    private AttributeOption attributeOption;
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
    private AttributeOption attributeOption;

   

<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
}
