package com.lmx.portfolio_backend.dto;

public class DashboardStatsResponse {

    private long skills;
    private long projects;
    private long experiences;
    private long resumes;
    private long unreadMessages;
    private long pendingFeedback;

    public DashboardStatsResponse(
            long skills,
            long projects,
            long experiences,
            long resumes,
            long unreadMessages,
            long pendingFeedback
    ) {
        this.skills = skills;
        this.projects = projects;
        this.experiences = experiences;
        this.resumes = resumes;
        this.unreadMessages = unreadMessages;
        this.pendingFeedback = pendingFeedback;
    }

    public long getSkills() {
        return skills;
    }

    public long getProjects() {
        return projects;
    }

    public long getExperiences() {
        return experiences;
    }

    public long getResumes() {
        return resumes;
    }

    public long getUnreadMessages() {
        return unreadMessages;
    }

    public long getPendingFeedback() {
        return pendingFeedback;
    }
}