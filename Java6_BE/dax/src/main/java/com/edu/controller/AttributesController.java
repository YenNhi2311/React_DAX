package com.edu.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.edu.entities.AttributeEntity;

import com.edu.services.AttributesService;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/attributes")
@CrossOrigin(origins = "*")
public class AttributesController {
    @Autowired
    private AttributesService attributeService;

    @GetMapping
    public ResponseEntity<List<AttributeEntity>> getAllAttributes() {
        List<AttributeEntity> attributes = attributeService.getAllAttributes();
        if (attributes.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(attributes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttributeEntity> getAttributeById(@PathVariable int id) {
        AttributeEntity attributes = attributeService.getAttributeById(id);
        if (attributes == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(attributes, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<AttributeEntity> saveAttribute(@RequestBody AttributeEntity attributes) {
        AttributeEntity savedAttribute = attributeService.saveAttribute(attributes);
        return new ResponseEntity<>(savedAttribute, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AttributeEntity> updateAttribute(@PathVariable int id, @RequestBody AttributeEntity attribute) {
        AttributeEntity updatedAttribute = attributeService.updateAttribute(id, attribute);
        if (updatedAttribute == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedAttribute, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttribute(@PathVariable int id) {
        attributeService.deleteAttribute(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/search")
    public ResponseEntity<List<AttributeEntity>> searchAttributes(@RequestParam(required = false) String name) {
        List<AttributeEntity> attributes = attributeService.searchAttributes(name);
        if (attributes.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(attributes, HttpStatus.OK);
    }
}