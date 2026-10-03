package com.lmx.portfolio_backend.controller;

import com.lmx.portfolio_backend.entity.ContactMessage;
import com.lmx.portfolio_backend.service.ContactMessageService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin
public class ContactMessageController {

    private final ContactMessageService contactMessageService;

    public ContactMessageController(ContactMessageService contactMessageService) {
        this.contactMessageService = contactMessageService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<ContactMessage> getAllMessages() {
        return contactMessageService.getAllMessages();
    }

    @PostMapping
    public ContactMessage saveMessage(@Valid @RequestBody ContactMessage message) {
        message.setRead(false);
        return contactMessageService.saveMessage(message);
    }
    @PutMapping("/{id}/read")
    @PreAuthorize("hasRole('ADMIN')")
    public ContactMessage markAsRead(@PathVariable Long id) {

        ContactMessage message = contactMessageService.getMessageById(id);
        message.setRead(true);

        return contactMessageService.saveMessage(message);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteMessage(@PathVariable Long id) {
        contactMessageService.deleteMessage(id);
    }
}