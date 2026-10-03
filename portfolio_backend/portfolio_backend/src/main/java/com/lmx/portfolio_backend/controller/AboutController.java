package com.lmx.portfolio_backend.controller;

import com.lmx.portfolio_backend.entity.About;
import com.lmx.portfolio_backend.service.AboutService;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/about")
@CrossOrigin
public class AboutController {

    private final AboutService aboutService;

    private final Path uploadDirectory =
            Paths.get("uploads/profile-images");

    public AboutController(AboutService aboutService) {
        this.aboutService = aboutService;
    }

    @GetMapping
    public About getAbout() {
        return aboutService.getAbout();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public About updateAbout(
            @PathVariable Long id,
            @RequestBody About about
    ) {
        about.setId(id);
        return aboutService.saveAbout(about);
    }

    @PostMapping(
            value = "/profile-image",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    @PreAuthorize("hasRole('ADMIN')")
    public String uploadProfileImage(
            @RequestParam("file") MultipartFile file
    ) throws IOException {

        if (file.isEmpty()) {
            throw new IllegalArgumentException("Profile image is empty");
        }

        String contentType = file.getContentType();

        if (contentType == null ||
                (!contentType.equalsIgnoreCase("image/jpeg")
                        && !contentType.equalsIgnoreCase("image/png")
                        && !contentType.equalsIgnoreCase("image/webp"))) {

            throw new IllegalArgumentException(
                    "Only JPG, PNG, and WebP images are allowed"
            );
        }

        Files.createDirectories(uploadDirectory);

        String originalFileName = file.getOriginalFilename();

        if (originalFileName == null || originalFileName.isBlank()) {
            throw new IllegalArgumentException("Invalid file name");
        }

        String safeFileName =
                Paths.get(originalFileName).getFileName().toString();

        String fileName =
                System.currentTimeMillis()
                        + "_"
                        + safeFileName;

        Path filePath = uploadDirectory.resolve(fileName);

        Files.copy(file.getInputStream(), filePath);

        return "/uploads/profile-images/" + fileName;
    }
}