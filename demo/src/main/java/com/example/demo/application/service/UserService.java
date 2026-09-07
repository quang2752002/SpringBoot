package com.example.demo.application.service;

import com.example.demo.application.dto.CreateUserCommand;
import com.example.demo.application.dto.UserResponseDto;
import com.example.demo.domain.exception.UserNotFoundException;
import com.example.demo.domain.model.Role;
import com.example.demo.domain.model.User;
import com.example.demo.infrastructure.persistence.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserResponseDto createUser(CreateUserCommand command) {
        User user = new User(null, command.getName(), null, command.getEmail(), Role.ROLE_USER);
        User savedUser = userRepository.save(user);
        return toDto(savedUser);
    }

    public UserResponseDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        return toDto(user);
    }

    public List<UserResponseDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        userRepository.deleteById(user.getId());
    }

    public UserResponseDto grantPermissionToUser(Long userId, com.example.demo.domain.model.Permission permission) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
        user.grantPermission(permission);
        userRepository.save(user);
        return toDto(user);
    }

    public UserResponseDto revokePermissionFromUser(Long userId, com.example.demo.domain.model.Permission permission) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
        user.revokePermission(permission);
        userRepository.save(user);
        return toDto(user);
    }

    private UserResponseDto toDto(User user) {
        String roleStr = user.getRole() != null ? user.getRole().name() : null;
        Set<String> permissionStrs = user.getAllPermissions()
                .stream()
                .map(com.example.demo.domain.model.Permission::getValue)
                .collect(Collectors.toSet());
        return new UserResponseDto(user.getId(), user.getUsername(), user.getEmail(), roleStr, permissionStrs);
    }
}
