package com.example.demo.application.service;

import com.example.demo.application.dto.AuthResponseDto;
import com.example.demo.application.dto.LoginCommand;
import com.example.demo.application.dto.RefreshTokenCommand;
import com.example.demo.application.dto.RegisterUserCommand;
import com.example.demo.domain.exception.UserNotFoundException;
import com.example.demo.domain.model.Permission;
import com.example.demo.domain.model.Role;
import com.example.demo.domain.model.User;
import com.example.demo.infrastructure.persistence.repository.UserRepository;
import com.example.demo.infrastructure.security.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public AuthResponseDto register(RegisterUserCommand command) {
        if (userRepository.findByUsername(command.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists: " + command.getUsername());
        }

        Role role = command.getRole() != null ? command.getRole() : Role.ROLE_USER;

        User user = new User(
                null,
                command.getUsername(),
                passwordEncoder.encode(command.getPassword()),
                command.getEmail(),
                role
        );
        userRepository.save(user);

        return buildAuthResponse(user);
    }

    public AuthResponseDto login(LoginCommand command) {
        User user = userRepository.findByUsername(command.getUsername())
                .orElseThrow(() -> new BadCredentialsException("Invalid username or password"));

        if (!passwordEncoder.matches(command.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid username or password");
        }

        return buildAuthResponse(user);
    }

    public AuthResponseDto refreshToken(RefreshTokenCommand command) {
        String refreshToken = command.getRefreshToken();

        if (refreshToken == null || !jwtProvider.isRefreshToken(refreshToken) || jwtProvider.isTokenExpired(refreshToken)) {
            throw new BadCredentialsException("Invalid or expired refresh token");
        }

        String username = jwtProvider.extractUsername(refreshToken);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found for token"));

        return buildAuthResponse(user);
    }

    private AuthResponseDto buildAuthResponse(User user) {
        Set<String> permissions = user.getAllPermissions()
                .stream()
                .map(Permission::getValue)
                .collect(Collectors.toSet());

        String accessToken = jwtProvider.generateAccessToken(
                user.getUsername(),
                user.getRole().name(),
                permissions
        );
        String refreshToken = jwtProvider.generateRefreshToken(user.getUsername());
        return new AuthResponseDto(accessToken, refreshToken);
    }
}
