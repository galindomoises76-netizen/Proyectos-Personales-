package com.aiconsultancy.controller;

import com.aiconsultancy.model.ChatMessage;
import com.aiconsultancy.service.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {
    
    private final ChatService chatService;
    
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }
    
    @PostMapping("/message")
    public ResponseEntity<Map<String, Object>> sendMessage(
            @RequestBody Map<String, String> request) {
        
        String sessionId = request.getOrDefault("sessionId", generateSessionId());
        String message = request.get("message");
        String userEmail = request.get("userEmail");
        
        if (message == null || message.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Message cannot be empty"));
        }
        
        ChatMessage response = chatService.processMessage(sessionId, message, userEmail);
        
        Map<String, Object> result = new HashMap<>();
        result.put("sessionId", sessionId);
        result.put("message", response.getMessage());
        result.put("timestamp", response.getTimestamp());
        
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/history/{sessionId}")
    public ResponseEntity<List<ChatMessage>> getHistory(@PathVariable String sessionId) {
        List<ChatMessage> history = chatService.getConversationHistory(sessionId);
        return ResponseEntity.ok(history);
    }
    
    @PostMapping("/validate-email")
    public ResponseEntity<Map<String, Boolean>> validateEmail(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        boolean isValid = chatService.isValidEmail(email);
        return ResponseEntity.ok(Map.of("valid", isValid));
    }
    
    private String generateSessionId() {
        return "session_" + System.currentTimeMillis() + "_" + 
               (int)(Math.random() * 10000);
    }
}
