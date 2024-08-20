package com.edu.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.entities.SkusEntity;
import com.edu.jpa.SkusJPA;

@Service
public class SkuService {

    @Autowired
    private SkusJPA skuRepository;

    public List<SkusEntity> getSkusByProductId(Integer productId) {
        return skuRepository.findByProductId(productId);
    }
    
    // Method to get SKUs by both productId and skuId
    public List<SkusEntity> getSkusByProductIdAndSkuId(Integer productId, Integer skuId) {
        return skuRepository.findByProductIdAndId(productId, skuId);
    }

    public List<SkusEntity> getAllSkusEntity() {
        return skuRepository.findAll();
    }

    public SkusEntity getSkusEntityById(int id) {
        return skuRepository.findById(id).orElse(null);
    }

    public SkusEntity saveSkusEntity(SkusEntity SkusEntity) {
        return skuRepository.save(SkusEntity);
    }

    public SkusEntity updateSkusEntity(int id, SkusEntity SkusEntity) {
        if (skuRepository.existsById(id)) {
            SkusEntity.setId(id);
            return skuRepository.save(SkusEntity);
        }
        return null;
    }

    public void deleteSkusEntity(int id) {
        skuRepository.deleteById(id);
    }
    public boolean existsByCode(String code) {
        return skuRepository.existsByCode(code);
    }

    public boolean existsByCodeAndIdNot(String code, int id) {
        return skuRepository.existsByCodeAndIdNot(code, id);
    }
    public List<SkusEntity> searchAttributesOption(String code) {
        if (code != null ) {
            return skuRepository.findByCode(code);
        } else {
            return skuRepository.findAll();
        }
    }
   
}
