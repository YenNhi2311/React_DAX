package com.edu.jpa;

import java.util.List;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.entities.AttributeEntity;


@Repository
public interface AttributesJPA extends JpaRepository<AttributeEntity, Integer> {

    // Tìm kiếm attribute theo tên
    List<AttributeEntity> findByName(String name);

    List<AttributeEntity> findAll();
}