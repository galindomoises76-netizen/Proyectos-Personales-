package com.aiconsultancy.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    private final JavaMailSender mailSender;
    
    @Value("${admin.email}")
    private String adminEmail;
    
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }
    
    public void sendQuoteRequestNotification(QuoteRequestData data) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(adminEmail);
        message.setSubject("New Quote Request from " + data.getName());
        message.setText(buildQuoteRequestEmail(data));
        mailSender.send(message);
    }
    
    public void sendQuoteRequestConfirmation(String userEmail, String userName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(userEmail);
        message.setSubject("Thank you for your interest - AI Consultancy");
        message.setText(buildConfirmationEmail(userName));
        mailSender.send(message);
    }
    
    private String buildQuoteRequestEmail(QuoteRequestData data) {
        return String.format(
            "New Quote Request Received\n\n" +
            "Name: %s\n" +
            "Company: %s\n" +
            "Email: %s\n" +
            "Phone: %s\n" +
            "Industry: %s\n" +
            "Service Type: %s\n" +
            "Budget Range: %s\n\n" +
            "Project Description:\n%s\n\n" +
            "Please follow up with this lead as soon as possible.",
            data.getName(), data.getCompany(), data.getEmail(), 
            data.getPhone(), data.getIndustry(), data.getServiceType(),
            data.getBudgetRange() != null ? data.getBudgetRange() : "Not specified",
            data.getProjectDescription()
        );
    }
    
    private String buildConfirmationEmail(String userName) {
        return String.format(
            "Dear %s,\n\n" +
            "Thank you for your interest in our AI automation services. " +
            "We have received your quote request and our team will review it shortly.\n\n" +
            "We typically respond within 24-48 hours. If you have any urgent questions, " +
            "please don't hesitate to reach out.\n\n" +
            "Best regards,\n" +
            "AI Consultancy Team",
            userName
        );
    }
    
    public record QuoteRequestData(
        String name, String company, String email, String phone,
        String industry, String serviceType, String projectDescription, String budgetRange
    ) {}
}
