package com.edu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.entities.ProductPromotionEntity;
import com.edu.jpa.ProductpromotionJPA;


@RestController
@RequestMapping("/api/productspromotion")
@CrossOrigin(origins = "*")
public class ProductpromotionController {
    @Autowired
    private ProductpromotionJPA productpromotionRepository;


    @GetMapping
    public List<ProductPromotionEntity> getAllProductpromotion() {
        return productpromotionRepository.findAll();
    }

 
}
