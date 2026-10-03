package com.lmx.portfolio_backend.service;

import com.lmx.portfolio_backend.entity.Feedback;
import com.lmx.portfolio_backend.repository.FeedbackRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    public Feedback saveFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }
    public Feedback getFeedbackById(Long id) {
        return feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));
    }
    public List<Feedback> getApprovedFeedback() {
        return feedbackRepository.findByApprovedTrue();
    }

    public void deleteFeedback(Long id) {
        feedbackRepository.deleteById(id);
    }
}