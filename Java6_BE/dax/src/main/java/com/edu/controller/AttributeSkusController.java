package com.edu.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.edu.dto.AttributesSkusDTO;
import com.edu.entities.AttributeOption;
import com.edu.entities.AttributesSkusEntity;
import com.edu.entities.SkusEntity;
import com.edu.jpa.AttributeSkusJPA;
import com.edu.services.AttributeOptionService;
import com.edu.services.AttributeSkusService;
import com.edu.services.SkuService;

@RestController
@RequestMapping("/api/attribute-skus")
@CrossOrigin(origins = "*")
public class AttributeSkusController {

    @Autowired
    private AttributeSkusJPA attributeSkusRepository;

    @Autowired
    private AttributeSkusService attributeSkusService;

    @Autowired
    private SkuService skuService;

    @Autowired
    private AttributeOptionService attributeOptionService;

    // Convert from Entity to DTO
    private AttributesSkusDTO convertToDTO(AttributesSkusEntity entity) {
        return new AttributesSkusDTO(
            entity.getId(),
            entity.getSkus() != null ? entity.getSkus().getId() : 0,
            entity.getAttributeOption() != null ? entity.getAttributeOption().getId() : 0
        );
    }

    @GetMapping
    public ResponseEntity<List<AttributesSkusDTO>> getAllAttributeSkus() {
        List<AttributesSkusEntity> attributeSkus = attributeSkusRepository.findAll();

        if (attributeSkus.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        List<AttributesSkusDTO> attributeSkusDTOs = attributeSkus.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());

        return new ResponseEntity<>(attributeSkusDTOs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttributesSkusDTO> getAttributeSkusById(@PathVariable int id) {
        AttributesSkusEntity attributeSkus = attributeSkusService.getAttributeSkusById(id);
        if (attributeSkus == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        AttributesSkusDTO attributeSkusDTO = convertToDTO(attributeSkus);
        return new ResponseEntity<>(attributeSkusDTO, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> saveAttributeSkus(@RequestBody AttributesSkusDTO request) {
        SkusEntity skuEntity = skuService.getSkusEntityById(request.getSkusId());
        if (skuEntity == null) {
            return new ResponseEntity<>("Không tìm thấy SKU với ID: " + request.getSkusId(), HttpStatus.NOT_FOUND);
        }
        AttributeOption attributeOption = attributeOptionService.getAttributeOptionById(request.getAttributeOptionId());
        if (attributeOption == null) {
            return new ResponseEntity<>("Không tìm thấy Attribute Option với ID: " + request.getAttributeOptionId(), HttpStatus.NOT_FOUND);
        }

        AttributesSkusEntity newAttributeSkus = new AttributesSkusEntity();
        newAttributeSkus.setSkus(skuEntity);
        newAttributeSkus.setAttributeOption(attributeOption);

        AttributesSkusEntity savedAttributeSkus = attributeSkusService.saveAttributeSkus(newAttributeSkus);

        AttributesSkusDTO savedAttributeSkusDTO = convertToDTO(savedAttributeSkus);
        return new ResponseEntity<>(savedAttributeSkusDTO, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAttributeSkus(@PathVariable int id, @RequestBody AttributesSkusDTO request) {
        AttributesSkusEntity existingAttributeSkus = attributeSkusService.getAttributeSkusById(id);
        if (existingAttributeSkus == null) {
            return new ResponseEntity<>("Không tìm thấy Attribute Skus với ID: " + id, HttpStatus.NOT_FOUND);
        }

        SkusEntity skuEntity = skuService.getSkusEntityById(request.getSkusId());
        if (skuEntity == null) {
            return new ResponseEntity<>("Không tìm thấy SKU với ID: " + request.getSkusId(), HttpStatus.NOT_FOUND);
        }

        AttributeOption attributeOption = attributeOptionService.getAttributeOptionById(request.getAttributeOptionId());
        if (attributeOption == null) {
            return new ResponseEntity<>("Không tìm thấy Attribute Option với ID: " + request.getAttributeOptionId(), HttpStatus.NOT_FOUND);
        }

        existingAttributeSkus.setSkus(skuEntity);
        existingAttributeSkus.setAttributeOption(attributeOption);

        AttributesSkusEntity updatedAttributeSkus = attributeSkusService.saveAttributeSkus(existingAttributeSkus);

        AttributesSkusDTO updatedAttributeSkusDTO = convertToDTO(updatedAttributeSkus);
        return new ResponseEntity<>(updatedAttributeSkusDTO, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAttributeSkus(@PathVariable int id) {
        try {
            attributeSkusService.deleteAttributeSkus(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
