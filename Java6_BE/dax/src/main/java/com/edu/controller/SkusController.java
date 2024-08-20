package com.edu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.edu.entities.ProductEntity;
import com.edu.entities.SkusEntity;

import com.edu.services.ProductService;
import com.edu.services.SkuService;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/skus")
@CrossOrigin(origins = "*") // Cấu hình CORS cho controller
public class SkusController {

    @Autowired
    private SkuService skusService;

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<SkusEntity>> getAllSkus() {
        List<SkusEntity> skus = skusService.getAllSkusEntity();
        if (skus.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(skus, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SkusEntity> getSkusById(@PathVariable int id) {
        SkusEntity skus = skusService.getSkusEntityById(id);
        if (skus == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(skus, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> saveSkus(
            @RequestParam("code") String code,
            @RequestParam("product") int productId,
            @RequestParam("price") Double price) {

        ProductEntity productEntity = productService.getProductById(productId);
        if (productEntity == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // // Kiểm tra mã SKU đã tồn tại
        // if (skusService.existsByCode(code)) {
        //     return new ResponseEntity<>("Mã SKU đã tồn tại", HttpStatus.BAD_REQUEST);
        // }

        SkusEntity newSkus = new SkusEntity();
        newSkus.setCode(code);
        newSkus.setProduct(productEntity);
        newSkus.setPrice(price);

        SkusEntity savedSkus = skusService.saveSkusEntity(newSkus);
        return new ResponseEntity<>(savedSkus, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSkus(
            @PathVariable int id,
            @RequestParam("code") String code,
            @RequestParam("product") int productId,
            @RequestParam("price") Double price) {

        SkusEntity skusID = skusService.getSkusEntityById(id);
        if (skusID == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        ProductEntity productEntity = productService.getProductById(productId);
        if (productEntity == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // // Kiểm tra mã SKU đã tồn tại và không phải của SKU hiện tại
        // if (skusService.existsByCodeAndIdNot(code, id)) {
        //     return new ResponseEntity<>("Mã SKU đã tồn tại", HttpStatus.BAD_REQUEST);
        // }

        skusID.setCode(code);
        skusID.setProduct(productEntity);
        skusID.setPrice(price);

        SkusEntity updateSkus = skusService.updateSkusEntity(id, skusID);
        if (updateSkus == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(updateSkus, HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSkus(@PathVariable int id) {
        skusService.deleteSkusEntity(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }




}
