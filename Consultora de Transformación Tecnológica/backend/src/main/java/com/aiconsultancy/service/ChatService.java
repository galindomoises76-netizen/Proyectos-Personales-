package com.aiconsultancy.service;

import com.aiconsultancy.model.ChatMessage;
import com.aiconsultancy.repository.ChatMessageRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Pattern;

@Service
public class ChatService {
    
    private final ChatMessageRepository chatMessageRepository;
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
        "^[A-Za-z0-9+_.-]+@(.+)$"
    );
    
    public ChatService(ChatMessageRepository chatMessageRepository) {
        this.chatMessageRepository = chatMessageRepository;
    }
    
    public ChatMessage processMessage(String sessionId, String userMessage, String userEmail) {
        // Save user message
        ChatMessage userMsg = new ChatMessage();
        userMsg.setSessionId(sessionId);
        userMsg.setMessage(userMessage);
        userMsg.setSender("user");
        userMsg.setUserEmail(userEmail);
        chatMessageRepository.save(userMsg);
        
        // Generate bot response
        String botResponse = generateResponse(userMessage.toLowerCase(), userEmail);
        
        // Save bot response
        ChatMessage botMsg = new ChatMessage();
        botMsg.setSessionId(sessionId);
        botMsg.setMessage(botResponse);
        botMsg.setSender("bot");
        chatMessageRepository.save(botMsg);
        
        return botMsg;
    }
    
    private String generateResponse(String message, String userEmail) {
        // Check if email is needed
        if (userEmail == null || userEmail.isEmpty()) {
            if (message.contains("email") || message.contains("contact") || 
                message.contains("details") || message.contains("more")) {
                return "I'd be happy to provide more detailed information! " +
                       "Could you please provide your email address so we can continue our conversation?";
            }
        }
        
        // Service-related queries
        if (message.contains("service") || message.contains("offer") || 
            message.contains("what do you") || message.contains("qué ofrecen")) {
            return "We offer three main services:\n\n" +
                   "1. **AI Training & Education**: Comprehensive training programs to help your team understand and leverage AI technologies.\n" +
                   "2. **Process Automation**: Automate repetitive tasks and workflows to increase efficiency and reduce costs.\n" +
                   "3. **Custom AI Solutions**: Tailored AI applications designed specifically for your business needs.\n\n" +
                   "Would you like more details about any specific service?";
        }
        
        // How AI can help
        if (message.contains("how can ai help") || message.contains("cómo puede ayudar") ||
            message.contains("benefit") || message.contains("beneficio")) {
            return "AI can transform your business in several ways:\n\n" +
                   "• **Automate repetitive tasks** - Free up your team for strategic work\n" +
                   "• **Improve decision-making** - Data-driven insights for better choices\n" +
                   "• **Enhance customer experience** - Personalized interactions and faster responses\n" +
                   "• **Reduce costs** - Optimize operations and eliminate inefficiencies\n" +
                   "• **Competitive advantage** - Stay ahead with cutting-edge technology\n\n" +
                   "Would you like to discuss how AI could specifically benefit your industry?";
        }
        
        // Timeline queries
        if (message.contains("timeline") || message.contains("time") || 
            message.contains("how long") || message.contains("cuánto tiempo") ||
            message.contains("duración")) {
            return "Project timelines vary based on complexity:\n\n" +
                   "• **AI Training Programs**: 2-4 weeks\n" +
                   "• **Process Automation**: 4-12 weeks\n" +
                   "• **Custom AI Solutions**: 8-24 weeks\n\n" +
                   "We provide detailed timelines after understanding your specific requirements. " +
                   "Would you like to schedule a consultation to discuss your project?";
        }
        
        // Pricing queries
        if (message.contains("price") || message.contains("cost") || 
            message.contains("pricing") || message.contains("precio") ||
            message.contains("costo")) {
            return "Our pricing is customized based on your specific needs and project scope. " +
                   "We offer:\n\n" +
                   "• **Transparent pricing** - No hidden fees\n" +
                   "• **Flexible packages** - From training to full implementation\n" +
                   "• **ROI-focused** - We ensure your investment delivers measurable results\n\n" +
                   "To get an accurate quote, please fill out our quote request form or provide your email " +
                   "and we'll send you a detailed pricing guide.";
        }
        
        // Greeting
        if (message.contains("hello") || message.contains("hi") || 
            message.contains("hola") || message.contains("buenos días")) {
            return "Hello! I'm here to help you learn about our AI automation services. " +
                   "How can I assist you today? You can ask about our services, how AI can help your business, " +
                   "project timelines, or pricing.";
        }
        
        // Default response
        return "Thank you for your question! I can help you with information about:\n\n" +
               "• Our services (AI Training, Process Automation, Custom Solutions)\n" +
               "• How AI can benefit your business\n" +
               "• Project timelines\n" +
               "• Pricing information\n\n" +
               "Feel free to ask me anything, or you can request a personalized quote through our form!";
    }
    
    public List<ChatMessage> getConversationHistory(String sessionId) {
        return chatMessageRepository.findBySessionIdOrderByTimestampAsc(sessionId);
    }
    
    public boolean isValidEmail(String email) {
        return email != null && EMAIL_PATTERN.matcher(email).matches();
    }
}
