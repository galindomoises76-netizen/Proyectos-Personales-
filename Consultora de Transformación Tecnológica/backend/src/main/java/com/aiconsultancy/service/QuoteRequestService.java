package com.aiconsultancy.service;

import com.aiconsultancy.model.QuoteRequest;
import com.aiconsultancy.repository.QuoteRequestRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class QuoteRequestService {
    
    private final QuoteRequestRepository quoteRequestRepository;
    private final EmailService emailService;
    
    public QuoteRequestService(QuoteRequestRepository quoteRequestRepository, 
                               EmailService emailService) {
        this.quoteRequestRepository = quoteRequestRepository;
        this.emailService = emailService;
    }
    
    @Transactional
    public QuoteRequest createQuoteRequest(QuoteRequest quoteRequest) {
        QuoteRequest saved = quoteRequestRepository.save(quoteRequest);
        
        // Send notification to admin
        try {
            emailService.sendQuoteRequestNotification(
                new EmailService.QuoteRequestData(
                    saved.getName(), saved.getCompany(), saved.getEmail(),
                    saved.getPhone(), saved.getIndustry(), saved.getServiceType(),
                    saved.getProjectDescription(), saved.getBudgetRange()
                )
            );
        } catch (Exception e) {
            // Log error but don't fail the request
            System.err.println("Failed to send admin notification: " + e.getMessage());
        }
        
        // Send confirmation to user
        try {
            emailService.sendQuoteRequestConfirmation(saved.getEmail(), saved.getName());
        } catch (Exception e) {
            // Log error but don't fail the request
            System.err.println("Failed to send confirmation email: " + e.getMessage());
        }
        
        return saved;
    }
    
    public QuoteRequest getQuoteRequest(Long id) {
        return quoteRequestRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Quote request not found"));
    }
}
