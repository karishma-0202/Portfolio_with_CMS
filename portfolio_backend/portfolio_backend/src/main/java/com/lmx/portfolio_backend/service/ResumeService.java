package com.lmx.portfolio_backend.service;

import com.lmx.portfolio_backend.entity.Resume;
import com.lmx.portfolio_backend.repository.ResumeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;

    public ResumeService(ResumeRepository resumeRepository) {
        this.resumeRepository = resumeRepository;
    }

    public List<Resume> getAllResumes() {
        return resumeRepository.findAll();
    }

    public Resume saveResume(Resume resume) {

        if (Boolean.TRUE.equals(resume.getActive())) {
            List<Resume> resumes = resumeRepository.findAll();

            for (Resume existingResume : resumes) {
                if (existingResume.getId() != null &&
                        !existingResume.getId().equals(resume.getId())) {

                    existingResume.setActive(false);
                }
            }

            resumeRepository.saveAll(resumes);
        }

        return resumeRepository.save(resume);
    }

    public void deleteResume(Long id) {
        resumeRepository.deleteById(id);
    }
}