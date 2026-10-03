package com.lmx.portfolio_backend.controller;

import com.lmx.portfolio_backend.entity.Feedback;
import com.lmx.portfolio_backend.service.FeedbackService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.lmx.portfolio_backend.dto.PublicFeedbackResponse;
import java.util.stream.Collectors;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Feedback> getAllFeedback() {
        return feedbackService.getAllFeedback();
    }

    @PostMapping
    public Feedback saveFeedback(@Valid @RequestBody Feedback feedback) {
        feedback.setApproved(false);
        return feedbackService.saveFeedback(feedback);
    }
    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public Feedback approveFeedback(@PathVariable Long id) {

        Feedback feedback = feedbackService.getFeedbackById(id);
        feedback.setApproved(true);

        return feedbackService.saveFeedback(feedback);
    }
    @GetMapping("/public")
    public List<PublicFeedbackResponse> getApprovedFeedback() {

        return feedbackService.getApprovedFeedback()
                .stream()
                .map(feedback -> new PublicFeedbackResponse(
                        feedback.getId(),
                        feedback.getName(),
                        feedback.getMessage(),
                        feedback.getRating()
                ))
                .collect(Collectors.toList());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteFeedback(@PathVariable Long id) {
        feedbackService.deleteFeedback(id);
    }
}