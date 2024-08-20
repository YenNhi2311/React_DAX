package com.edu.jpa;

import com.edu.entities.PromotionEntity;
<<<<<<< HEAD
<<<<<<< HEAD

import java.util.List;

=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromotionJPA extends JpaRepository<PromotionEntity, Integer> {
<<<<<<< HEAD
<<<<<<< HEAD

     // Tìm kiếm khuyến mãi theo tên và phần trăm khuyến mãi
   List<PromotionEntity> findByPromotionNameContainingIgnoreCaseAndPercents(String name, int percents);

   // Tìm kiếm khuyến mãi chỉ theo tên
   List<PromotionEntity> findByPromotionNameContainingIgnoreCase(String name);

   // Tìm kiếm khuyến mãi chỉ theo phần trăm khuyến mãi
   List<PromotionEntity> findByPercents(int percents);

=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
}
