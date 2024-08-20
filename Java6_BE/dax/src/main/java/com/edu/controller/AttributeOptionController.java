package com.edu.controller;

import com.edu.entities.AttributeEntity;
import com.edu.entities.AttributeOption;
import com.edu.dto.AttributeOptionDTO;
import com.edu.services.AttributeOptionService;
import com.edu.services.AttributesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/attribute-options")
@CrossOrigin(origins = "*")
public class AttributeOptionController {

    @Autowired
    private AttributeOptionService attributeOptionService;

    @Autowired
    private AttributesService attributeEntityService;

    private final String uploadDir = "C://New folder (5)//ReactJS_DAX-master//Java6_BE//static//assets//img//";

    @GetMapping
    public ResponseEntity<List<AttributeOptionDTO>> getAllAttributeOptions() {
        List<AttributeOption> attributeOptions = attributeOptionService.getAllAttributeOption();
        if (attributeOptions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        List<AttributeOptionDTO> dtos = attributeOptions.stream()
                .map(AttributeOptionDTO::fromEntity)
                .collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttributeOptionDTO> getAttributeOptionById(@PathVariable int id) {
        AttributeOption attributeOption = attributeOptionService.getAttributeOptionById(id);
        if (attributeOption == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        AttributeOptionDTO dto = AttributeOptionDTO.fromEntity(attributeOption);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<AttributeOptionDTO> saveAttributeOption(
            @RequestParam("attributes") int attributesId,
            @RequestParam("value") String value,
            @RequestParam(value = "img", required = false) MultipartFile img) {

        AttributeEntity attributeEntity = attributeEntityService.getAttributeById(attributesId);
        if (attributeEntity == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        AttributeOption newAttributeOption = new AttributeOption();
        newAttributeOption.setAttributes(attributeEntity);
        newAttributeOption.setValue(value);

        if (img != null && !img.isEmpty()) {
            try {
                String imagePath = saveImage(img);
                newAttributeOption.setImg(imagePath);
            } catch (IOException e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        AttributeOption savedAttributeOption = attributeOptionService.saveAttributeOption(newAttributeOption);
        AttributeOptionDTO dto = AttributeOptionDTO.fromEntity(savedAttributeOption);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AttributeOptionDTO> updateAttributeOption(
            @PathVariable int id,
            @RequestParam("attributes") int attributesId,
            @RequestParam("value") String value,
            @RequestParam(value = "img", required = false) MultipartFile img) {

        // Lấy tùy chọn thuộc tính hiện tại
        AttributeOption existingAttributeOption = attributeOptionService.getAttributeOptionById(id);
        if (existingAttributeOption == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Lấy thực thể thuộc tính
        AttributeEntity attributeEntity = attributeEntityService.getAttributeById(attributesId);
        if (attributeEntity == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Cập nhật các trường của tùy chọn thuộc tính
        existingAttributeOption.setAttributes(attributeEntity);
        existingAttributeOption.setValue(value);

        // Cập nhật hình ảnh nếu có hình ảnh mới được cung cấp
        if (img != null && !img.isEmpty()) {
            try {
                String imagePath = saveImage(img);
                existingAttributeOption.setImg(imagePath);
            } catch (IOException e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        // Lưu tùy chọn thuộc tính đã cập nhật
        AttributeOption updatedAttributeOption = attributeOptionService.updateAttributeOption(id, existingAttributeOption);
        if (updatedAttributeOption == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Chuyển đổi sang DTO và trả về phản hồi
        AttributeOptionDTO dto = AttributeOptionDTO.fromEntity(updatedAttributeOption);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttributeOption(@PathVariable int id) {
        attributeOptionService.deleteAttributeOption(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/search")
    public ResponseEntity<List<AttributeOptionDTO>> searchAttributesOption(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String value) {
        List<AttributeOption> attributeOptions = attributeOptionService.searchAttributesOption(name, value);
        if (attributeOptions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        List<AttributeOptionDTO> dtos = attributeOptions.stream()
                .map(AttributeOptionDTO::fromEntity)
                .collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    private String saveImage(MultipartFile img) throws IOException {
        // Lấy tên file gốc
        String fileName = img.getOriginalFilename();
        File uploadFile = new File(uploadDir + fileName);

        // Đảm bảo rằng thư mục tải lên tồn tại
        Files.createDirectories(Paths.get(uploadDir));

        try {
            // Lưu file vào thư mục tải lên
            img.transferTo(uploadFile);
        } catch (IOException e) {
            // Ném ra lỗi nếu có sự cố khi lưu file
            throw new IOException("Lỗi khi lưu file hình ảnh", e);
        }

        // Trả về tên file đã lưu
        return fileName;
    }

}
