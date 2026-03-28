package com.tecstorm.housematch.auth.api;

import com.tecstorm.housematch.auth.application.AuthService;
import com.tecstorm.housematch.auth.api.dto.LoginRequest;
import com.tecstorm.housematch.auth.api.dto.LoginResponse;
import com.tecstorm.housematch.auth.api.dto.RegisterRequest;
import com.tecstorm.housematch.auth.api.dto.RegisterResponse;
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

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }


}
