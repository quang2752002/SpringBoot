package com.example.demo.presentation.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateProductRequest {
    private String name;
    private String categoryId;
    private BigDecimal price;
    private BigDecimal originalPrice;
    private Double rating;
    private Integer reviewsCount;
    private Integer stock;
    private String status;
    private String image;
    private String description;
}
