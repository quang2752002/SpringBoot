package com.example.demo.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.Access;
import java.time.LocalDate;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateRequest {
     String password;
     String lastName;
     String firstName;
     LocalDate dob;



}
