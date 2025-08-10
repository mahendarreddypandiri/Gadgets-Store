package com.gadgets.backendspring.contact;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {
    private final ContactMessageRepository repository;

    @PostMapping
    public ResponseEntity<ContactMessage> submit(@RequestBody ContactReq body) {
        ContactMessage msg = ContactMessage.builder()
                .name(body.getName())
                .email(body.getEmail())
                .message(body.getMessage())
                .build();
        return ResponseEntity.status(201).body(repository.save(msg));
    }

    @Data
    public static class ContactReq {
        @NotBlank private String name;
        @Email @NotBlank private String email;
        @NotBlank private String message;
    }
}