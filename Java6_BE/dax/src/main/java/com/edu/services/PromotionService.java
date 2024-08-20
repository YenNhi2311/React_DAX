package com.edu.services;

import com.edu.entities.PromotionEntity;
import com.edu.jpa.PromotionJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PromotionService {

    @Autowired
    private PromotionJPA promotionRepository;

    public List<PromotionEntity> getAllPromotions() {
        return promotionRepository.findAll();
    }

    public PromotionEntity getPromotionById(int id) {
        return promotionRepository.findById(id).orElse(null);
    }

    public PromotionEntity savePromotion(PromotionEntity promotion) {
        return promotionRepository.save(promotion);
    }

    public void deletePromotion(int id) {
        promotionRepository.deleteById(id);
    }
<<<<<<< HEAD
<<<<<<< HEAD

    public PromotionEntity updatePromotion(int id, PromotionEntity promotion) {
        if (promotionRepository.existsById(id)) {
            promotion.setPromotionID(id);
            return promotionRepository.save(promotion);
        }
        return null;
    }

   public List<PromotionEntity> searchPromotions(String name, Integer percents) {
    if (name != null && percents != null) {
        return promotionRepository.findByPromotionNameContainingIgnoreCaseAndPercents(name, percents);
    } else if (name != null) {
        return promotionRepository.findByPromotionNameContainingIgnoreCase(name);
    } else if (percents != null) {
        return promotionRepository.findByPercents(percents);
    } else {
        return promotionRepository.findAll(); // Trả về tất cả nếu không có tham số nào
    }
}
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
}
