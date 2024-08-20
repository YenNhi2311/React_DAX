package com.edu.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edu.entities.ProductPromotionEntity;
import com.edu.entities.ProductEntity;
import com.edu.entities.PromotionEntity;

@Repository
public interface ProductpromotionJPA extends JpaRepository<ProductPromotionEntity, Integer> {
    // Tìm các khuyến mãi cho một sản phẩm cụ thể
    List<ProductPromotionEntity> findByProduct(ProductEntity product);

    // Tìm các khuyến mãi theo khuyến mãi cụ thể
    List<ProductPromotionEntity> findByPromotion(PromotionEntity promotion);
    
}
