package com.example.demo.infrastructure.persistence.repository;

import com.example.demo.domain.model.Category;
import com.example.demo.domain.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(Category category);
    List<Product> findByCategoryId(String categoryId);
    List<Product> findByNameContainingIgnoreCase(String keyword);
    List<Product> findByCategoryIdAndNameContainingIgnoreCase(String categoryId, String keyword);
}
