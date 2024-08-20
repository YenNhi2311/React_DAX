package com.edu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.edu.entities.CategoryEntity;
import com.edu.services.CategoryService;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    private final String uploadDir = "D:\\JAVA_6\\ReactJS_DAX-master(1)\\ReactJS_DAX-master(3)\\ReactJS_DAX-master(2)\\ReactJS_DAX-master\\ReactJS_DAX-master\\Java6_BE\\dax\\src\\main\\resources\\static\\img\\";

    @GetMapping
    public ResponseEntity<List<CategoryEntity>> getAllCategories() {
        List<CategoryEntity> categories = categoryService.getAllCategories();
        if (categories.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryEntity> getCategoryById(@PathVariable int id) {
        CategoryEntity category = categoryService.getCategoryById(id);
        if (category == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable int id) {
        CategoryEntity existingCategory = categoryService.getCategoryById(id);
        if (existingCategory == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        categoryService.deleteCategory(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

     @PostMapping
    public ResponseEntity<CategoryEntity> saveCategory(
            @RequestParam("categoryName") String categoryName,
            @RequestParam("description") String description,
            @RequestParam(value = "img", required = false) MultipartFile img) {
    
        if (categoryName == null || categoryName.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    
        CategoryEntity category = new CategoryEntity();
        category.setCategoryName(categoryName);
        category.setDescription(description);
        String imagePath = null;
        if (img != null && !img.isEmpty()) {
            try {
                imagePath = saveImage(img);
                category.setImg(imagePath);
            } catch (IOException e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    
        CategoryEntity savedCategory = categoryService.saveCategory(category);
        return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
public ResponseEntity<CategoryEntity> updateCategory(
        @PathVariable int id,
        @RequestParam("categoryName") String categoryName,
        @RequestParam("description") String description,
        @RequestParam(value = "img", required = false) MultipartFile img) {

    CategoryEntity categoryToUpdate = categoryService.getCategoryById(id);
    if (categoryToUpdate == null) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    categoryToUpdate.setCategoryName(categoryName);
    categoryToUpdate.setDescription(description);

    if (img != null && !img.isEmpty()) {
        try {
            String imagePath = saveImage(img);
            categoryToUpdate.setImg(imagePath); // Đảm bảo trường này trùng với thuộc tính trong CategoryEntity
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    CategoryEntity updatedCategory = categoryService.saveCategory(categoryToUpdate);
    return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
}



    @GetMapping("/search")
    public ResponseEntity<List<CategoryEntity>> searchCategories(
            @RequestParam(required = false) String name) {
        List<CategoryEntity> categories = categoryService.searchCategory(name);
        if (categories.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/uploads/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        File file = new File(uploadDir + filename);
        if (file.exists()) {
            Resource fileResource = new FileSystemResource(file);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, "image/jpeg") // Thay đổi nếu cần cho loại hình ảnh khác
                    .body(fileResource);
        } else {
            return ResponseEntity.notFound().build();
        }
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
