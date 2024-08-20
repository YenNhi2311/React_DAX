package com.edu.controller;

import com.edu.entities.ReviewEntity;
import com.edu.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/reviews")
public class ReviewController {
  @Autowired
  private ReviewService reviewService;

  @PostMapping
  public ResponseEntity<String> addReview(@RequestBody ReviewEntity review) {
    try {
      reviewService.saveReview(review);
      return ResponseEntity.ok("Đánh giá đã được gửi thành công!");
    } catch (Exception e) {
      return ResponseEntity.status(500).body("Có lỗi xảy ra khi gửi đánh giá.");
    }
  }
}
