package com.lmx.portfolio_backend.service;

import com.lmx.portfolio_backend.entity.About;
import com.lmx.portfolio_backend.repository.AboutRepository;
import org.springframework.stereotype.Service;

@Service
public class AboutService {

    private final AboutRepository aboutRepository;

    public AboutService(AboutRepository aboutRepository) {
        this.aboutRepository = aboutRepository;
    }

    public About getAbout() {
        return aboutRepository.findAll()
                .stream()
                .findFirst()
                .orElse(null);
    }

    public About saveAbout(About about) {
        return aboutRepository.save(about);
    }
}