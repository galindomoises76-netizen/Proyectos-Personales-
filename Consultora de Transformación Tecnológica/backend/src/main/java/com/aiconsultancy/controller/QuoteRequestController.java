package com.aiconsultancy.controller;

import com.aiconsultancy.model.QuoteRequest;
import com.aiconsultancy.service.QuoteRequestService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/quote")
@CrossOrigin(origins = "http://localhost:3000")
public class QuoteRequestController {
    
    private final QuoteRequestService quoteRequestService;
    
    public QuoteRequestController(QuoteRequestService quoteRequestService) {
        this.quoteRequestService = quoteRequestService;
    }
    
    @PostMapping("/request")
    public ResponseEntity<Map<String, Object>> createQuoteRequest(
            @Valid @RequestBody QuoteRequest quoteRequest) {
        
        try {
            QuoteRequest saved = quoteRequestService.createQuoteRequest(quoteRequest);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Quote request submitted successfully. We'll contact you soon!");
            response.put("id", saved.getId());
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "An error occurred while processing your request. Please try again.");
            response.put("error", e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<QuoteRequest> getQuoteRequest(@PathVariable Long id) {
        QuoteRequest quoteRequest = quoteRequestService.getQuoteRequest(id);
        return ResponseEntity.ok(quoteRequest);
    }
}
