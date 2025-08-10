package com.gadgets.backendspring.newsletter;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NewsletterRepository extends JpaRepository<Newsletter, String> {
    Optional<Newsletter> findByEmail(String email);
}