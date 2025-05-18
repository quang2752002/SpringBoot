package com.example.demo.dto.request;

import com.example.demo.exception.ErrorCode;
import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.validation.constraints.Size;
import java.time.LocalDate;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {

    @Size(min = 3,message = "USERNAME_INVALID")
     String username;

    @Size(min = 8,message = "PASSWORD_INVALID")
     String password;

     String lastName;

     String firstName;

     LocalDate dob;


}
