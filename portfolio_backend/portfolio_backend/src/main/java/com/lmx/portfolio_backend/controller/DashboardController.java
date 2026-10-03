package com.lmx.portfolio_backend.controller;

import com.lmx.portfolio_backend.dto.DashboardStatsResponse;
import com.lmx.portfolio_backend.repository.ContactMessageRepository;
import com.lmx.portfolio_backend.repository.ExperienceRepository;
import com.lmx.portfolio_backend.repository.FeedbackRepository;
import com.lmx.portfolio_backend.repository.ProjectRepository;
import com.lmx.portfolio_backend.repository.ResumeRepository;
import com.lmx.portfolio_backend.repository.SkillRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final SkillRepository skillRepository;
    private final ProjectRepository projectRepository;
    private final ExperienceRepository experienceRepository;
    private final ResumeRepository resumeRepository;
    private final ContactMessageRepository contactMessageRepository;
    private final FeedbackRepository feedbackRepository;

    public DashboardController(
            SkillRepository skillRepository,
            ProjectRepository projectRepository,
            ExperienceRepository experienceRepository,
            ResumeRepository resumeRepository,
            ContactMessageRepository contactMessageRepository,
            FeedbackRepository feedbackRepository
    ) {
        this.skillRepository = skillRepository;
        this.projectRepository = projectRepository;
        this.experienceRepository = experienceRepository;
        this.resumeRepository = resumeRepository;
        this.contactMessageRepository = contactMessageRepository;
        this.feedbackRepository = feedbackRepository;
    }

    @Operation(
            security = {
                    @SecurityRequirement(name = "bearerAuth")
            }
    )
    @GetMapping
    public DashboardStatsResponse getStats() {
        return new DashboardStatsResponse(
                skillRepository.count(),
                projectRepository.count(),
                experienceRepository.count(),
                resumeRepository.count(),
                contactMessageRepository.countByReadFalse(),
                feedbackRepository.countByApprovedFalse()
        );
    }
}