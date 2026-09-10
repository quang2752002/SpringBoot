package com.example.demo.application.service;

import com.example.demo.application.dto.ProductDto;
import com.example.demo.domain.model.Category;
import com.example.demo.domain.model.Product;
import com.example.demo.infrastructure.persistence.repository.CategoryRepository;
import com.example.demo.infrastructure.persistence.repository.ProductRepository;
import com.example.demo.presentation.request.CreateProductRequest;
import com.example.demo.presentation.request.UpdateProductRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public List<ProductDto> getProducts(String categoryId, String keyword) {
        List<Product> products;
        boolean hasCategory = StringUtils.hasText(categoryId) && !"all".equalsIgnoreCase(categoryId);
        boolean hasKeyword = StringUtils.hasText(keyword);

        if (hasCategory && hasKeyword) {
            products = productRepository.findByCategoryIdAndNameContainingIgnoreCase(categoryId, keyword.trim());
        } else if (hasCategory) {
            products = productRepository.findByCategoryId(categoryId);
        } else if (hasKeyword) {
            products = productRepository.findByNameContainingIgnoreCase(keyword.trim());
        } else {
            products = productRepository.findAll();
        }

        return products.stream().map(this::toDto).collect(Collectors.toList());
    }

    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy sản phẩm với id: " + id));
        return toDto(product);
    }

    public ProductDto createProduct(CreateProductRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Danh mục không tồn tại: " + request.getCategoryId()));

        Product product = Product.builder()
                .name(request.getName())
                .category(category)
                .price(request.getPrice())
                .originalPrice(request.getOriginalPrice())
                .rating(request.getRating() != null ? request.getRating() : 5.0)
                .reviewsCount(request.getReviewsCount() != null ? request.getReviewsCount() : 0)
                .stock(request.getStock() != null ? request.getStock() : 0)
                .status(StringUtils.hasText(request.getStatus()) ? request.getStatus() : "Còn hàng")
                .image(request.getImage())
                .description(request.getDescription())
                .build();

        Product saved = productRepository.save(product);
        return toDto(saved);
    }

    public ProductDto updateProduct(Long id, UpdateProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy sản phẩm với id: " + id));

        if (StringUtils.hasText(request.getName())) {
            product.setName(request.getName());
        }
        if (StringUtils.hasText(request.getCategoryId())) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new IllegalArgumentException("Danh mục không tồn tại: " + request.getCategoryId()));
            product.setCategory(category);
        }
        if (request.getPrice() != null) {
            product.setPrice(request.getPrice());
        }
        if (request.getOriginalPrice() != null) {
            product.setOriginalPrice(request.getOriginalPrice());
        }
        if (request.getRating() != null) {
            product.setRating(request.getRating());
        }
        if (request.getReviewsCount() != null) {
            product.setReviewsCount(request.getReviewsCount());
        }
        if (request.getStock() != null) {
            product.setStock(request.getStock());
        }
        if (request.getStatus() != null) {
            product.setStatus(request.getStatus());
        }
        if (request.getImage() != null) {
            product.setImage(request.getImage());
        }
        if (request.getDescription() != null) {
            product.setDescription(request.getDescription());
        }

        Product updated = productRepository.save(product);
        return toDto(updated);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new IllegalArgumentException("Không tìm thấy sản phẩm với id: " + id);
        }
        productRepository.deleteById(id);
    }

    public ProductDto toDto(Product product) {
        if (product == null) return null;
        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .category(product.getCategory() != null ? product.getCategory().getId() : null)
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : null)
                .price(product.getPrice())
                .originalPrice(product.getOriginalPrice())
                .rating(product.getRating())
                .reviewsCount(product.getReviewsCount())
                .stock(product.getStock())
                .status(product.getStatus())
                .image(product.getImage())
                .description(product.getDescription())
                .build();
    }
}
