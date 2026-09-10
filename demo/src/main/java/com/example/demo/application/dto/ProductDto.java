package com.example.demo.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDto {
    private Long id;
    private String name;
    private String category; // category id/slug e.g. "laptops", "phones"
    private String categoryName;
    private BigDecimal price;
    private BigDecimal originalPrice;
    private Double rating;
    private Integer reviewsCount;
    private Integer stock;
    private String status;
    private String image;
    private String description;
}
