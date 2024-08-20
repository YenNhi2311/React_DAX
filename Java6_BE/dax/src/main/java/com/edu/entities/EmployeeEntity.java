package com.edu.entities;

<<<<<<< HEAD
<<<<<<< HEAD
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
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
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6

import jakarta.persistence.*;
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
@Table(name = "employee")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeEntity {
<<<<<<< HEAD
<<<<<<< HEAD
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private int id;

  @Column(name = "username")
  private String username;

  @Column(name = "password")
  private String password;

  @Column(name = "email")
  private String email;

  @Column(name = "fullname")
  private String fullname;

  @Column(name = "phone_number")
  private String phoneNumber;

  @Column(name = "profile_picture")
  private String profilePicture;

  @CreationTimestamp
  @Column(name = "created_at", updatable = false)
  private Date createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at")
  private Date updatedAt;

  @Column(name = "status")
  private Boolean status;

  @Column(name = "gender")
  private Boolean gender;

  @ManyToOne
  @JoinColumn(name = "address_id")
  private AddressEntity address;

  @OneToMany(mappedBy = "user")
  @JsonIgnore
  private Set<OrderEntity> orders;

  @OneToMany(mappedBy = "employee")
  @JsonIgnore
  private Set<ReviewEntity> reviews;

  @OneToMany(mappedBy = "employee")
  @JsonIgnore
  private Set<CartItemEntity> cartItem;

  @Column(name = "role")
  private Boolean role; // Bit type in database mapped as Boolean
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    private String username;
    private String password;
    private String email;
    private String fullname;
    private String phoneNumber;
    private String profilePicture;
    private Date createdAt;
    private Date updatedAt;
    private Boolean status;
    private Boolean gender;

    @ManyToOne
    @JoinColumn(name = "address_id")
    @JsonBackReference
    private AddressEntity address;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private Set<OrderEntity> orders;

  

    @OneToMany(mappedBy = "employee")
    @JsonIgnore
    private Set<ReviewEntity> reviews;

    @Column(name = "role")
    private Boolean role; // Bit type in database mapped as Boolean

    // @Override
    // public String toString() {
    //     return "EmployeeEntity [id=" + id + ", username=" + username + ", role=" + role + "]";
    // }

<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
}
