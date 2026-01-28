package com.aiconsultancy.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "quote_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuoteRequest {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Name is required")
    @Size(max = 100)
    @Column(nullable = false)
    private String name;
    
    @NotBlank(message = "Company is required")
    @Size(max = 100)
    @Column(nullable = false)
    private String company;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Column(nullable = false)
    private String email;
    
    @NotBlank(message = "Phone is required")
    @Size(max = 20)
    @Column(nullable = false)
    private String phone;
    
    @Size(max = 100)
    private String industry;
    
    @NotBlank(message = "Service type is required")
    @Column(nullable = false)
    private String serviceType; // AI Training, Process Automation, Custom Development
    
    @NotBlank(message = "Project description is required")
    @Size(max = 2000)
    @Column(nullable = false, length = 2000)
    private String projectDescription;
    
    @Size(max = 50)
    private String budgetRange;
    
    @Column(nullable = false)
    private LocalDateTime createdAt;
    
    private Boolean processed = false;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
