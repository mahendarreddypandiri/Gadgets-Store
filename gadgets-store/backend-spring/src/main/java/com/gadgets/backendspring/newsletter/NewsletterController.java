package com.gadgets.backendspring.newsletter;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/newsletter")
@RequiredArgsConstructor
public class NewsletterController {
    private final NewsletterRepository repository;

    @PostMapping
    public ResponseEntity<Newsletter> subscribe(@RequestBody SubscribeReq body) {
        Newsletter existing = repository.findByEmail(body.getEmail()).orElse(null);
        if (existing != null) return ResponseEntity.ok(existing);
        Newsletter saved = repository.save(Newsletter.builder().email(body.getEmail()).build());
        return ResponseEntity.status(201).body(saved);
    }

    @Data
    public static class SubscribeReq {
        @Email @NotBlank
        private String email;
    }
}