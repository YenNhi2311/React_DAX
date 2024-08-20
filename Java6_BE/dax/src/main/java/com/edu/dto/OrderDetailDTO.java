package com.edu.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderDetailDTO {
  private int orderDetailId;
  private int skusId;
  private Double price;
  private Integer quantity;
  private Double unitprice;
}
