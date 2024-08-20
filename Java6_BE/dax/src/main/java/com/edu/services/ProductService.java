package com.edu.services;

<<<<<<< HEAD
<<<<<<< HEAD
import com.edu.dto.ProductDTO;
import com.edu.entities.AttributeOption;
import com.edu.entities.AttributesSkusEntity;
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import com.edu.entities.ProductEntity;
import com.edu.jpa.ProductJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

<<<<<<< HEAD
<<<<<<< HEAD
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
=======
import java.util.List;
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
import java.util.List;
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6

@Service
public class ProductService {

    @Autowired
    private ProductJPA productRepository;

    public List<ProductEntity> getAllProducts() {
<<<<<<< HEAD
<<<<<<< HEAD
        List<ProductEntity> products = productRepository.findAll();

        // Khởi tạo để tải thông tin skus cho mỗi sản phẩm
        for (ProductEntity product : products) {
            product.getSkus().size(); // Lazy loading để tải dữ liệu skus
        }

        return products;
    }

    // Option
    public List<AttributeOption> getProductOptions(int productId) {
        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        return product.getSkus().stream()
                .flatMap(sku -> sku.getAttributesSkus().stream())
                .map(AttributesSkusEntity::getAttributeOption)
                .distinct()
                .collect(Collectors.toList());
=======
        return productRepository.findAll();
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
        return productRepository.findAll();
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
    }

    public ProductEntity getProductById(int id) {
        return productRepository.findById(id).orElse(null);
    }

<<<<<<< HEAD
<<<<<<< HEAD
    public void deleteProduct(int id) {
        productRepository.deleteById(id);
    }

    public List<ProductEntity> searchProducts(String query) {
        return productRepository.findByNameContainingIgnoreCase(query);
    }

    public List<ProductEntity> findTop3ByOrderByCreatedAtDesc() {
        return productRepository.findTop3ByOrderByCreatedAtDesc();
    }

    //

    public ProductEntity saveProduct(ProductEntity product) {
        if (product.getId() == 0) { // Nếu là sản phẩm mới
            product.setCreatedAt(LocalDateTime.now());
            System.out.println("Setting createdAt: " + product.getCreatedAt());
        }
        product.setUpdatedAt(LocalDateTime.now());
        System.out.println("Setting updatedAt: " + product.getUpdatedAt());
        return productRepository.save(product);
    }
    // Phương thức chuyển đổi từ ProductEntity sang ProductDTO
    public ProductDTO convertToDTO(ProductEntity productEntity) {
        if (productEntity == null) {
            return null;
        }

        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(productEntity.getId());
        productDTO.setName(productEntity.getName());
        productDTO.setDescription(productEntity.getDescription());
        productDTO.setImgUrl(productEntity.getImgUrl());
        productDTO.setCategoryId(productEntity.getCategory() != null ? productEntity.getCategory().getCategoryId() : 0);
        productDTO.setCreatedAt(productEntity.getCreatedAt()); // Đảm bảo ngày tạo được chuyển đổi
        productDTO.setUpdatedAt(productEntity.getUpdatedAt()); // Đảm bảo ngày cập nhật được chuyển đổi

        return productDTO;
    }

    // Phương thức lấy tất cả sản phẩm dưới dạng ProductDTO
    public List<ProductDTO> getAllProductDTOs() {
        return getAllProducts().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Phương thức lấy sản phẩm theo ID dưới dạng ProductDTO
    public ProductDTO getProductDTOById(int id) {
        ProductEntity productEntity = getProductById(id);
        return convertToDTO(productEntity);
    }
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
    public ProductEntity saveProduct(ProductEntity product) {
        return productRepository.save(product);
    }

    public void deleteProduct(int id) {
        productRepository.deleteById(id);
    }
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
}
