package com.edu.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.entities.ProductEntity;
import com.edu.entities.ProductPromotionEntity;
import com.edu.jpa.ProductpromotionJPA;

@Service
public class ProductPromotionService {

    @Autowired
    private ProductpromotionJPA productPromotionRepository;

    public List<ProductPromotionEntity> getAllProductPromotion() {
        return productPromotionRepository.findAll();
    }

    public List<ProductPromotionEntity> getPromotionsForProduct(ProductEntity product) {
        return productPromotionRepository.findByProduct(product);
    }

    public ProductPromotionEntity saveProductPromotion(ProductPromotionEntity productPromotion) {
        return productPromotionRepository.save(productPromotion);
    }

    public void deleteProductPromotion(int id) {
        productPromotionRepository.deleteById(id);
        
    }
    
}

