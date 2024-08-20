package com.edu.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PromotionDTO {
    private int id;
    private String name;
    private double percent; // Tỉ lệ khuyến mãi
    private LocalDateTime startDate; // Ngày bắt đầu
    private LocalDateTime endDate; // Ngày kết thúc
}
