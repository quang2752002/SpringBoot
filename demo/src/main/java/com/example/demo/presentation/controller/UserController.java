package com.example.demo.presentation.controller;

import com.example.demo.application.dto.CreateUserCommand;
import com.example.demo.application.dto.UserResponseDto;
import com.example.demo.application.service.UserService;
import com.example.demo.domain.exception.UserNotFoundException;
import com.example.demo.presentation.request.CreateUserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // Yêu cầu permission 'user:create' HOẶC role ADMIN/MANAGER
    @PostMapping
    @PreAuthorize("hasAuthority('user:create')")
    public ResponseEntity<UserResponseDto> createUser(@Valid @RequestBody CreateUserRequest request) {
        CreateUserCommand command = new CreateUserCommand(request.getName(), request.getEmail());
        UserResponseDto responseDto = userService.createUser(command);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    // Yêu cầu permission 'user:read' (tất cả USER, MANAGER, ADMIN đều có)
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable Long id) {
        UserResponseDto responseDto = userService.getUserById(id);
        return ResponseEntity.ok(responseDto);
    }

    // Yêu cầu Role ADMIN hoặc MANAGER
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        List<UserResponseDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Chỉ duy nhất ADMIN mới có quyền xóa
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') and hasAuthority('user:delete')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    // Gán thêm quyền riêng cho một User (Chỉ ADMIN)
    @PostMapping("/{id}/permissions/{permission}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponseDto> grantPermission(
            @PathVariable Long id,
            @PathVariable com.example.demo.domain.model.Permission permission) {
        UserResponseDto responseDto = userService.grantPermissionToUser(id, permission);
        return ResponseEntity.ok(responseDto);
    }

    // Thu hồi quyền riêng của một User (Chỉ ADMIN)
    @DeleteMapping("/{id}/permissions/{permission}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponseDto> revokePermission(
            @PathVariable Long id,
            @PathVariable com.example.demo.domain.model.Permission permission) {
        UserResponseDto responseDto = userService.revokePermissionFromUser(id, permission);
        return ResponseEntity.ok(responseDto);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFound(UserNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
