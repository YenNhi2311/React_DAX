package com.edu.jpa;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.entities.AttributesSkusEntity;

@Repository
public interface AttributeSkusJPA extends JpaRepository<AttributesSkusEntity, Integer>{
    
}
