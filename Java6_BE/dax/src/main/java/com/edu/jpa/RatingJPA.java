package com.edu.jpa;

import com.edu.entities.RatingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingJPA extends JpaRepository<RatingEntity, Integer> {
}
