package com.edu.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.edu.services.PromotionService;
import com.edu.entities.PromotionEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/promotions")
@CrossOrigin(origins = "*")
public class PromotionController {
    @Autowired
    private PromotionService proService;

    @GetMapping
    public ResponseEntity<List<PromotionEntity>> getAllPromotions() {
        List<PromotionEntity> promotions = proService.getAllPromotions();
        if(promotions.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(promotions, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PromotionEntity> getPromotionById(@PathVariable int id) {
        PromotionEntity promotion = proService.getPromotionById(id);
        if(promotion == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(promotion, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<PromotionEntity> savePromotion(@RequestBody PromotionEntity promotion){
        PromotionEntity savedPromotion = proService.savePromotion(promotion);
        return new ResponseEntity<>(savedPromotion, HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<PromotionEntity> updatePromotion(
            @PathVariable int id,
            @RequestBody PromotionEntity promotion) {
        PromotionEntity updatedPromotion = proService.updatePromotion(id, promotion);
        if (updatedPromotion == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedPromotion, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePromotion(@PathVariable int id) {
        proService.deletePromotion(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/search")
    public ResponseEntity<List<PromotionEntity>> searchPromotions(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Integer percents) {
        List<PromotionEntity> promotions = proService.searchPromotions(name, percents);
        if(promotions.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(promotions, HttpStatus.OK);
    }
}


    
    
    

