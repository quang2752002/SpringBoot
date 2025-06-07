package com.example.demo.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UsersResponse {
     Long id;
     String username;
     String password;
     String lastName;
     String firstName;
     LocalDate dob;
     Set<String> roles;
}
