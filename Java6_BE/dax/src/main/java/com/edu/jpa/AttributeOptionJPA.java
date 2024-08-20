package com.edu.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edu.entities.AttributeOption;

@Repository
public interface AttributeOptionJPA extends JpaRepository<AttributeOption, Integer> {
    // Tìm kiếm attribute option theo tên hoặc giá trị
    List<AttributeOption> findByAttributes_NameOrValue(String name, String value);
}