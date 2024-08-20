package com.edu.services;

import com.edu.entities.CategoryEntity;
import com.edu.jpa.CategoryJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryJPA categoryRepository;

    public List<CategoryEntity> getAllCategories() {
        return categoryRepository.findAll();
    }

    public CategoryEntity getCategoryById(int id) {
        return categoryRepository.findById(id).orElse(null);
    }

    public CategoryEntity saveCategory(CategoryEntity category) {
        return categoryRepository.save(category);
    }

    public void deleteCategory(int id) {
        categoryRepository.deleteById(id);
    }
<<<<<<< HEAD
<<<<<<< HEAD

    public CategoryEntity updateCategory(int id, CategoryEntity category) {
        if (categoryRepository.existsById(id)) {
            category.setCategoryId(id);
            return categoryRepository.save(category);
        }
        return null;
    }

    public List<CategoryEntity> searchCategory(String name) {
        if (name != null && !name.isEmpty()) {
            return categoryRepository.findByCategoryNameContainingIgnoreCase(name);
        } else {
            return categoryRepository.findAll(); // Trả về tất cả nếu không có tham số nào
        }
    }
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
}
