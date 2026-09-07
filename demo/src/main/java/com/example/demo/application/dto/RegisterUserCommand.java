package com.example.demo.application.dto;

import com.example.demo.domain.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterUserCommand {
    private String username;
    private String password;
    private String email;
    private Role role;
}
