package com.lmx.portfolio_backend.repository;

import com.lmx.portfolio_backend.entity.About;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AboutRepository extends JpaRepository<About, Long> {
}