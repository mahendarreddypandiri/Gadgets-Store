package com.gadgets.backendspring.product;

import com.gadgets.backendspring.review.Review;
import com.gadgets.backendspring.review.ReviewRepository;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Validated
public class ProductController {
    private final ProductRepository productRepository;
    private final ReviewRepository reviewRepository;

    @GetMapping
    public List<Product> list(@RequestParam(required = false) String category,
                              @RequestParam(required = false) BigDecimal minPrice,
                              @RequestParam(required = false) BigDecimal maxPrice) {
        // Simple filtering in memory for demo; for production, add specs or query
        List<Product> all = productRepository.findAll();
        return all.stream()
                .filter(p -> category == null || p.getCategory().equalsIgnoreCase(category))
                .filter(p -> minPrice == null || p.getPrice().compareTo(minPrice) >= 0)
                .filter(p -> maxPrice == null || p.getPrice().compareTo(maxPrice) <= 0)
                .toList();
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Product> get(@PathVariable String slug) {
        return productRepository.findBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{slug}/reviews")
    public ResponseEntity<Review> addReview(@PathVariable String slug, @RequestBody ReviewRequest body) {
        Product product = productRepository.findBySlug(slug).orElse(null);
        if (product == null) return ResponseEntity.notFound().build();
        Review review = Review.builder()
                .author(body.getAuthor())
                .rating(body.getRating())
                .text(body.getText())
                .product(product)
                .build();
        return ResponseEntity.status(201).body(reviewRepository.save(review));
    }

    @Data
    public static class ReviewRequest {
        private String author;
        @Min(1) @Max(5)
        private Integer rating;
        private String text;
    }
}