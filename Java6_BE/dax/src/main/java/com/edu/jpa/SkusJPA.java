package com.edu.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edu.entities.SkusEntity;

@Repository
public interface SkusJPA extends JpaRepository<SkusEntity, Integer> {
    List<SkusEntity> findByProductId(int productId);
    
    List<SkusEntity> findByProductIdAndId(int productId, int id);

    List<SkusEntity> findByCode(String code);

   boolean existsByCode(String code);

   boolean existsByCodeAndIdNot(String code, int id);

}