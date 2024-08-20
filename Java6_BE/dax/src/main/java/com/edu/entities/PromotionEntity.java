package com.edu.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;

import java.math.BigDecimal;
<<<<<<< HEAD
<<<<<<< HEAD
import java.time.LocalDateTime;
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import java.util.Date;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "promotions")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PromotionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
<<<<<<< HEAD
<<<<<<< HEAD
    @Column(name = "promotion_id")
    private int promotionID;

    @Column(name = "promotion_name", nullable = false)
    private String promotionName;

    @Column(name = "percents", nullable = false)
    private int percents;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @OneToMany(mappedBy = "promotion")
    @JsonIgnore
    private Set<ProductPromotionEntity> productPromotion;
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
    private int promotionId;

    private String promotionName;
    private BigDecimal percents;
    private Date startDate;
    private Date endDate;

    @OneToMany(mappedBy = "promotion")
    @JsonIgnore
    private Set<ProductEntity> orders;
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
}
