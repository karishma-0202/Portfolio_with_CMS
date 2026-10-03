package com.lmx.portfolio_backend.controller;

import com.lmx.portfolio_backend.entity.Admin;
import com.lmx.portfolio_backend.service.AdminService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }


}