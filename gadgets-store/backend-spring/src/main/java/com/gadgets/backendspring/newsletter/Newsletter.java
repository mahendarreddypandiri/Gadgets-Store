package com.gadgets.backendspring.newsletter;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "newsletter", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Newsletter {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String email;

    private Instant createdAt = Instant.now();
}