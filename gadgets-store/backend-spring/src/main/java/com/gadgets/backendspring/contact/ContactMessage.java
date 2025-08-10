package com.gadgets.backendspring.contact;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "contact_messages")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ContactMessage {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;
    private String email;

    @Column(columnDefinition = "TEXT")
    private String message;

    private Instant createdAt = Instant.now();
}