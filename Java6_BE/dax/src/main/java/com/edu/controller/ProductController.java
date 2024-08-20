package com.edu.controller;

<<<<<<< HEAD
<<<<<<< HEAD
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.edu.dto.ProductDTO;
import com.edu.entities.AttributeOption;
import com.edu.entities.CategoryEntity;
import com.edu.entities.ProductEntity;
import com.edu.entities.SkusEntity;
import com.edu.exception.ErrorResponsea;
import com.edu.jpa.ProductJPA;
import com.edu.jpa.SkusJPA;
import com.edu.services.FileUploadService;
import com.edu.services.ProductPromotionService;
import com.edu.services.ProductService;
import com.edu.services.PromotionService;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductJPA productRepository;

    @Autowired
    private ProductService productService;

    // @Autowired
    // private ProductPromotionService productPromotionService;

    // @Autowired
    // private PromotionService promotionService;

    // @Autowired
    // private FileUploadService fileUploadService;
    private final String uploadDir = "D:\\JAVA_6\\ReactJS_DAX-master(1)\\ReactJS_DAX-master(3)\\ReactJS_DAX-master(2)\\ReactJS_DAX-master\\ReactJS_DAX-master\\Java6_BE\\dax\\src\\main\\resources\\static\\img\\";
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE_TIME;


    //select Top 3 lastes
    @GetMapping("/latest")
    public ResponseEntity<List<ProductEntity>> getLatestProducts() {
        List<ProductEntity> latestProducts = productService.findTop3ByOrderByCreatedAtDesc();
        return new ResponseEntity<>(latestProducts, HttpStatus.OK);
    }

    @GetMapping
    public List<ProductEntity> getAllProducts() {
        return productRepository.findAll();
    }

    // @GetMapping("/{id}")
    // public ResponseEntity<ProductEntity> getProductById(@PathVariable int id) {
    //     ProductEntity product = productService.getProductById(id);
    //     if (product != null) {
    //         return ResponseEntity.ok(product);
    //     } else {
    //         return ResponseEntity.notFound().build();
    //     }
    // }

    // @PostMapping
    // public ResponseEntity<ProductEntity> saveProduct(@RequestBody ProductEntity product) {
    //     ProductEntity savedProduct = productService.saveProduct(product);
    //     return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    // }

    // @PutMapping("/{id}")
    // public ResponseEntity<ProductEntity> updateProduct(@PathVariable int id, @RequestBody ProductEntity product) {
    //     ProductEntity existingProduct = productService.getProductById(id);
    //     if (existingProduct == null) {
    //         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //     }
    //     product.setId(id); // Đảm bảo rằng ID của sản phẩm được giữ nguyên
    //     ProductEntity updatedProduct = productService.saveProduct(product);
    //     return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    // }


    // @DeleteMapping("/{id}")
    // public ResponseEntity<Void> deleteProduct(@PathVariable int id) {
    //     ProductEntity existingProduct = productService.getProductById(id);
    //     if (existingProduct == null) {
    //         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //     }
    //     productService.deleteProduct(id);
    //     return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    // }

    // Search
    @GetMapping("/search")
    public List<ProductEntity> searchProducts(@RequestParam("query") String query) {
        return productService.searchProducts(query);
    }


    // Xử lý ngày giờ khi nhận từ frontend
    private LocalDateTime parseDateTime(String dateTimeString) {
        if (dateTimeString == null || dateTimeString.trim().isEmpty()) {
            return null;
        }
        try {
            return LocalDateTime.parse(dateTimeString, DateTimeFormatter.ISO_DATE_TIME);
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Invalid date time format: " + dateTimeString, e);
        }
    }

    @PostMapping
    public ResponseEntity<ProductDTO> saveProduct(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("categoryId") int categoryId,
            // @RequestParam(value = "promotionId", required = false) Integer promotionId,
            @RequestParam(value = "imgUrl", required = false) MultipartFile img) {

        LocalDateTime now = LocalDateTime.now(); // Ngày hiện tại

        // Handle file upload
        String fileName = null;
        if (img != null && !img.isEmpty()) {
            try {
                fileName = saveImage(img);
            } catch (IOException e) {
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        ProductDTO productDTO = new ProductDTO();
        productDTO.setName(name);
        productDTO.setDescription(description);
        productDTO.setCategoryId(categoryId);
        // productDTO.setPromotionId(promotionId != null ? promotionId : 0); // Khuyến
        // mãi nếu có
        productDTO.setCreatedAt(now); // Ngày tạo
        productDTO.setUpdatedAt(now); // Ngày cập nhật
        productDTO.setImgUrl(fileName);

        ProductEntity productEntity = convertToEntity(productDTO);

        // Kiểm tra nếu productEntity không hợp lệ
        if (productEntity == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        ProductEntity savedProduct = productService.saveProduct(productEntity);
        ProductDTO savedProductDTO = convertToDTO(savedProduct);

        return new ResponseEntity<>(savedProductDTO, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(
            @PathVariable int id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("categoryId") int categoryId,
            @RequestParam(value = "updatedAt", required = false) String updatedAtString,
            @RequestParam(value = "imgUrl", required = false) MultipartFile img) {

        ProductEntity existingProduct = productService.getProductById(id);
        if (existingProduct == null) {
            return new ResponseEntity<>(new ErrorResponsea("Product not found"), HttpStatus.NOT_FOUND);
        }

        LocalDateTime createdAt = existingProduct.getCreatedAt();
        LocalDateTime updatedAt = LocalDateTime.now();

        if (updatedAtString != null && !updatedAtString.trim().isEmpty()) {
            try {
                updatedAt = LocalDateTime.parse(updatedAtString, DateTimeFormatter.ISO_DATE_TIME);
                if (updatedAt.isBefore(createdAt)) {
                    return new ResponseEntity<>(new ErrorResponsea("Ngày cập nhật không được nhỏ hơn ngày tạo"),
                            HttpStatus.BAD_REQUEST);
                }
            } catch (DateTimeParseException e) {
                return new ResponseEntity<>(new ErrorResponsea("Invalid date time format: " + updatedAtString),
                        HttpStatus.BAD_REQUEST);
            }
        }

        String fileName = null;
        if (img != null && !img.isEmpty()) {
            try {
                fileName = saveImage(img);
            } catch (IOException e) {
                return new ResponseEntity<>(new ErrorResponsea("Lỗi khi lưu file hình ảnh"),
                        HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            fileName = existingProduct.getImgUrl();
        }

        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(id);
        productDTO.setName(name);
        productDTO.setDescription(description);
        productDTO.setCategoryId(categoryId);
        productDTO.setCreatedAt(createdAt);
        productDTO.setUpdatedAt(updatedAt);
        productDTO.setImgUrl(fileName);

        ProductEntity productEntity = convertToEntity(productDTO);
        ProductEntity updatedProduct = productService.saveProduct(productEntity);
        ProductDTO updatedProductDTO = convertToDTO(updatedProduct);

        return new ResponseEntity<>(updatedProductDTO, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductEntity> getProductById(@PathVariable int id) {
        ProductEntity product = productService.getProductById(id);
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int id) {
        ProductEntity existingProduct = productService.getProductById(id);
        if (existingProduct == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Helper methods to convert between entities and DTOs
    private ProductDTO convertToDTO(ProductEntity product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setImgUrl(product.getImgUrl());
        dto.setCategoryId(product.getCategory() != null ? product.getCategory().getCategoryId() : 0);
        return dto;
    }

    // Kiểm tra phương thức convertToEntity
    private ProductEntity convertToEntity(ProductDTO dto) {
        ProductEntity entity = new ProductEntity();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setImgUrl(dto.getImgUrl());

        CategoryEntity category = new CategoryEntity();
        category.setCategoryId(dto.getCategoryId());
        entity.setCategory(category);
        if (dto.getId() == 0) {
            entity.setCreatedAt(dto.getCreatedAt());
        }
        entity.setUpdatedAt(dto.getUpdatedAt());

        return entity;
    }

    // Lưu tệp ảnh với đường dẫn và thêm kiểm tra hợp lệ
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



=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.entities.ProductEntity;
import com.edu.services.ProductService;


@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    @Autowired
    private ProductService productService;

    // Get all Products
    @GetMapping
    public List<ProductEntity> getAllProducts() {
        return productService.getAllProducts();
    }
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
}
