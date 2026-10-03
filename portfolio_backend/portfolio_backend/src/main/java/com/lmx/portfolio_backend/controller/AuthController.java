package com.lmx.portfolio_backend.controller;

import com.lmx.portfolio_backend.dto.LoginRequest;
import com.lmx.portfolio_backend.dto.LoginResponse;
import com.lmx.portfolio_backend.entity.Admin;
import com.lmx.portfolio_backend.service.AdminService;
import com.lmx.portfolio_backend.service.JwtService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final AdminService adminService;
    private final JwtService jwtService;

    public AuthController(AdminService adminService,
                          JwtService jwtService) {
        this.adminService = adminService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {

        Admin admin = adminService.findByUsername(request.getUsername());

        if (admin == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid username or password"
            );
        }

        if (!adminService.passwordMatches(
                request.getPassword(),
                admin.getPassword())) {

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid username or password"
            );
        }

        String token = jwtService.generateToken(admin);

        return new LoginResponse(
                token,
                admin.getUsername(),
                admin.getRole()
        );
    }
}