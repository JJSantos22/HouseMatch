package com.tecstorm.housematch.controller;

import com.tecstorm.housematch.dto.RegisterRequest;
import com.tecstorm.housematch.dto.RegisterResponse;
import com.tecstorm.housematch.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }


}
