package com.lmx.portfolio_backend.controller;

import com.lmx.portfolio_backend.entity.Resume;
import com.lmx.portfolio_backend.service.ResumeService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    private final ResumeService resumeService;

    private final Path uploadDirectory =
            Paths.get("uploads/resumes");

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @GetMapping
    public List<Resume> getAllResumes() {
        return resumeService.getAllResumes();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Resume uploadResume(
            @RequestParam("file") MultipartFile file
    ) throws IOException {

        if (file.isEmpty()) {
            throw new IllegalArgumentException("Resume file is empty");
        }

        String contentType = file.getContentType();

        if (!"application/pdf".equalsIgnoreCase(contentType)) {
            throw new IllegalArgumentException("Only PDF files are allowed");
        }

        Files.createDirectories(uploadDirectory);

        String originalFileName = file.getOriginalFilename();

        if (originalFileName == null || originalFileName.isBlank()) {
            throw new IllegalArgumentException("Invalid file name");
        }

        String fileName = System.currentTimeMillis()
                + "_"
                + Paths.get(originalFileName).getFileName();

        Path filePath = uploadDirectory.resolve(fileName);

        Files.copy(file.getInputStream(), filePath);

        Resume resume = new Resume();

        resume.setFileName(originalFileName);
        resume.setFileUrl("/uploads/resumes/" + fileName);
        resume.setActive(true);

        return resumeService.saveResume(resume);
    }

    @PutMapping("/{id}")
    public Resume updateResume(
            @PathVariable Long id,
            @RequestBody Resume resume
    ) {
        resume.setId(id);
        return resumeService.saveResume(resume);
    }

    @DeleteMapping("/{id}")
    public void deleteResume(@PathVariable Long id) {
        resumeService.deleteResume(id);
    }
}