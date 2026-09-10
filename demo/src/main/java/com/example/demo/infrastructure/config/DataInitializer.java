package com.example.demo.infrastructure.config;

import com.example.demo.domain.model.Category;
import com.example.demo.domain.model.Product;
import com.example.demo.infrastructure.persistence.repository.CategoryRepository;
import com.example.demo.infrastructure.persistence.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {
        if (categoryRepository.count() == 0) {
            log.info("Khởi tạo danh mục mẫu ban đầu...");
            Category phones = Category.builder().id("phones").name("Điện thoại").description("Smartphone cao cấp và phổ thông").build();
            Category laptops = Category.builder().id("laptops").name("Laptop").description("Laptop văn phòng, đồ họa, gaming").build();
            Category audio = Category.builder().id("audio").name("Âm thanh & Tai nghe").description("Tai nghe, loa bluetooth cao cấp").build();
            Category accessories = Category.builder().id("accessories").name("Phụ kiện").description("Bàn phím, chuột, sạc cáp").build();

            categoryRepository.saveAll(Arrays.asList(phones, laptops, audio, accessories));
        }

        if (productRepository.count() == 0) {
            log.info("Khởi tạo sản phẩm mẫu ban đầu...");
            Category phones = categoryRepository.findById("phones").orElse(null);
            Category laptops = categoryRepository.findById("laptops").orElse(null);
            Category audio = categoryRepository.findById("audio").orElse(null);
            Category accessories = categoryRepository.findById("accessories").orElse(null);

            List<Product> products = Arrays.asList(
                    Product.builder()
                            .name("MacBook Pro 16 M3 Max")
                            .category(laptops)
                            .price(new BigDecimal("79990000"))
                            .originalPrice(new BigDecimal("85000000"))
                            .rating(4.9)
                            .reviewsCount(128)
                            .stock(24)
                            .status("Còn hàng")
                            .image("https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80")
                            .description("Chip Apple M3 Max với CPU 16 lõi, GPU 40 lõi, RAM 48GB, SSD 1TB. Màn hình Liquid Retina XDR siêu nét đỉnh cao công nghệ.")
                            .build(),
                    Product.builder()
                            .name("iPhone 16 Pro Max 256GB")
                            .category(phones)
                            .price(new BigDecimal("34990000"))
                            .originalPrice(new BigDecimal("36990000"))
                            .rating(4.8)
                            .reviewsCount(340)
                            .stock(58)
                            .status("Còn hàng")
                            .image("https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80")
                            .description("Thiết kế titan sa mạc sang trọng, nút Điều Khiển Camera hoàn toàn mới, chip A18 Pro mạnh mẽ vượt bậc.")
                            .build(),
                    Product.builder()
                            .name("Sony WH-1000XM5")
                            .category(audio)
                            .price(new BigDecimal("7490000"))
                            .originalPrice(new BigDecimal("8990000"))
                            .rating(4.7)
                            .reviewsCount(95)
                            .stock(15)
                            .status("Còn hàng")
                            .image("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80")
                            .description("Tai nghe chống ồn đỉnh cao số 1 thế giới với 8 micro và bộ xử lý Auto NC Optimizer, âm thanh Hi-Res chân thực.")
                            .build(),
                    Product.builder()
                            .name("Bàn phím cơ không dây Keychron Q1 Pro")
                            .category(accessories)
                            .price(new BigDecimal("4350000"))
                            .originalPrice(new BigDecimal("4800000"))
                            .rating(4.9)
                            .reviewsCount(64)
                            .stock(8)
                            .status("Sắp hết hàng")
                            .image("https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80")
                            .description("Khung nhôm CNC nguyên khối, kết nối Bluetooth 5.1 & Type-C, switch mượt mà gõ cực êm ái.")
                            .build(),
                    Product.builder()
                            .name("Dell XPS 15 9530 Core i9")
                            .category(laptops)
                            .price(new BigDecimal("54990000"))
                            .originalPrice(new BigDecimal("59990000"))
                            .rating(4.6)
                            .reviewsCount(42)
                            .stock(12)
                            .status("Còn hàng")
                            .image("https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop&q=80")
                            .description("Màn hình OLED 3.5K cảm ứng tuyệt mỹ, card đồ họa RTX 4070 mạnh mẽ cho dân sáng tạo nội dung chuyên nghiệp.")
                            .build(),
                    Product.builder()
                            .name("Apple Watch Ultra 2 GPS + Cellular")
                            .category(accessories)
                            .price(new BigDecimal("20990000"))
                            .originalPrice(new BigDecimal("21990000"))
                            .rating(4.9)
                            .reviewsCount(88)
                            .stock(19)
                            .status("Còn hàng")
                            .image("https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=80")
                            .description("Vỏ titan 49mm chuẩn quân đội, màn hình sáng 3000 nits, thời lượng pin lên đến 72 giờ ở chế độ tiết kiệm.")
                            .build()
            );

            productRepository.saveAll(products);
            log.info("Đã khởi tạo thành công {} sản phẩm mẫu!", products.size());
        }
    }
}
