package com.example.demo.presentation.controller;

import com.example.demo.application.dto.AuthResponseDto;
import com.example.demo.application.dto.LoginCommand;
import com.example.demo.application.dto.RefreshTokenCommand;
import com.example.demo.application.dto.RegisterUserCommand;
import com.example.demo.application.service.AuthService;
import com.example.demo.presentation.request.LoginRequest;
import com.example.demo.presentation.request.RefreshTokenRequest;
import com.example.demo.presentation.request.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(@Valid @RequestBody RegisterRequest request) {
        RegisterUserCommand command = new RegisterUserCommand(
                request.getUsername(),
                request.getPassword(),
                request.getEmail(),
                request.getRole()
        );
        AuthResponseDto responseDto = authService.register(command);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@Valid @RequestBody LoginRequest request) {
        LoginCommand command = new LoginCommand(request.getUsername(), request.getPassword());
        AuthResponseDto responseDto = authService.login(command);
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthResponseDto> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        RefreshTokenCommand command = new RefreshTokenCommand(request.getRefreshToken());
        AuthResponseDto responseDto = authService.refreshToken(command);
        return ResponseEntity.ok(responseDto);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> handleBadCredentials(BadCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
}
