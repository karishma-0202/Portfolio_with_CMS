package com.lmx.portfolio_backend.repository;

import com.lmx.portfolio_backend.entity.Experience;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {
}