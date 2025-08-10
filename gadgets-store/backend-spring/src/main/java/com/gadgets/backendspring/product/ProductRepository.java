package com.gadgets.backendspring.product;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, String> {
    Optional<Product> findBySlug(String slug);
}