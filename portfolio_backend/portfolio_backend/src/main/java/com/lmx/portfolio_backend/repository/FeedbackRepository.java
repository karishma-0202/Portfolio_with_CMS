package com.lmx.portfolio_backend.repository;

import com.lmx.portfolio_backend.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByApprovedTrue();
    long countByApprovedFalse();
}