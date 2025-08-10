package com.gadgets.backendspring.product;

import com.gadgets.backendspring.review.Review;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ProductDataLoader implements CommandLineRunner {
    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {
        if (productRepository.count() > 0) return;
        Product p1 = Product.builder()
                .slug("iphone-15-pro-256gb")
                .title("iPhone 15 Pro 256GB")
                .category("Smartphones")
                .description("The latest iPhone 15 Pro with powerful A17 Pro chip, ProMotion display, and advanced camera system.")
                .price(new BigDecimal("1099"))
                .stock(12)
                .images(List.of(
                        "https://images.unsplash.com/photo-1695048131573-0dc27dedd288?q=80&w=1200&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1695048140738-3f2263f4b3f5?q=80&w=1200&auto=format&fit=crop"
                ))
                .build();
        Product p2 = Product.builder()
                .slug("samsung-galaxy-s24-ultra")
                .title("Samsung Galaxy S24 Ultra")
                .category("Smartphones")
                .description("Epic camera, vivid display, and all-day battery in the Galaxy S24 Ultra.")
                .price(new BigDecimal("1199"))
                .stock(8)
                .images(List.of("https://images.unsplash.com/photo-1610945415295-d9bbf67f6b1b?q=80&w=1200&auto=format&fit=crop"))
                .build();
        Product p3 = Product.builder()
                .slug("sony-wh-1000xm5")
                .title("Sony WH-1000XM5 Headphones")
                .category("Headphones")
                .description("Industry-leading noise cancellation with premium sound and comfort.")
                .price(new BigDecimal("399"))
                .stock(25)
                .images(List.of("https://images.unsplash.com/photo-1518447962129-5bcf8f65b7a6?q=80&w=1200&auto=format&fit=crop"))
                .build();
        Product p4 = Product.builder()
                .slug("apple-watch-series-9")
                .title("Apple Watch Series 9")
                .category("Smartwatches")
                .description("Powerful health features, brilliant display, and seamless iPhone integration.")
                .price(new BigDecimal("449"))
                .stock(0)
                .images(List.of("https://images.unsplash.com/photo-1511732351157-1865efcb7b7b?q=80&w=1200&auto=format&fit=crop"))
                .build();

        p1.getReviews().add(Review.builder().author("Alex").rating(5).text("Blazing fast and beautiful display.").product(p1).build());
        p1.getReviews().add(Review.builder().author("Mia").rating(4).text("Great phone, battery life could be better.").product(p1).build());
        p3.getReviews().add(Review.builder().author("Priya").rating(5).text("Best ANC headphones I have used.").product(p3).build());

        productRepository.saveAll(List.of(p1, p2, p3, p4));
    }
}