package com.example.demo.application.service;

import com.example.demo.application.dto.CategoryDto;
import com.example.demo.domain.model.Category;
import com.example.demo.infrastructure.persistence.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public CategoryDto getCategoryById(String id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy danh mục với mã: " + id));
        return toDto(category);
    }

    public CategoryDto createCategory(Category category) {
        if (categoryRepository.existsById(category.getId())) {
            throw new IllegalArgumentException("Danh mục với mã " + category.getId() + " đã tồn tại");
        }
        Category saved = categoryRepository.save(category);
        return toDto(saved);
    }

    public CategoryDto toDto(Category category) {
        if (category == null) return null;
        return CategoryDto.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .build();
    }
}
