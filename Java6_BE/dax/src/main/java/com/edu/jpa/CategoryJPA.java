package com.edu.jpa;

import com.edu.entities.CategoryEntity;
<<<<<<< HEAD
<<<<<<< HEAD

import java.util.List;

=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryJPA extends JpaRepository<CategoryEntity, Integer> {
<<<<<<< HEAD
<<<<<<< HEAD

    List<CategoryEntity> findByCategoryNameContainingIgnoreCase(String name);
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
}

