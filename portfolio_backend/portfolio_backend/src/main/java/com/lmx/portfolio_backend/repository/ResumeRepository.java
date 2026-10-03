package com.lmx.portfolio_backend.repository;

import com.lmx.portfolio_backend.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
}