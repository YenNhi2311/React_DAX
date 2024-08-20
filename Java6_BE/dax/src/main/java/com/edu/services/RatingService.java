package com.edu.services;

import com.edu.entities.RatingEntity;
import com.edu.jpa.RatingJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {

    @Autowired
    private RatingJPA ratingRepository;

    public List<RatingEntity> getAllRatings() {
        return ratingRepository.findAll();
    }

    public RatingEntity getRatingById(int id) {
        return ratingRepository.findById(id).orElse(null);
    }

    public RatingEntity saveRating(RatingEntity rating) {
        return ratingRepository.save(rating);
    }

    public void deleteRating(int id) {
        ratingRepository.deleteById(id);
    }
}
