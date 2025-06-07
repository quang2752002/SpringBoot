package com.example.demo.service;

import com.example.demo.dto.request.UserCreationRequest;
import com.example.demo.dto.request.UserUpdateRequest;
import com.example.demo.dto.response.UsersResponse;
import com.example.demo.entity.Users;
import com.example.demo.enums.Roles;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.mapper.UserMapper;
import com.example.demo.repository.UserRepository;
import com.nimbusds.jose.proc.SecurityContext;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.var;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor// thay auto Autowired
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)

public class UsersService {

    UserRepository userRepository;
    UserMapper userMapper;

    public Users createRequest(UserCreationRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        Users users = new Users();

        users.setFirstName(request.getFirstName());
        users.setDob(request.getDob());
        users.setUsername(request.getUsername());
        users.setLastName(request.getLastName());

        PasswordEncoder passwordEncoder= new BCryptPasswordEncoder(10);
        users.setPassword(passwordEncoder.encode(request.getPassword()));
        HashSet<String> roles =new HashSet<>();
        roles.add(Roles.USER.name());

        //users.setRoles(roles);
        return userRepository.save(users);
    }

    @PreAuthorize("hasRole('ADMIN')")//kiểm tra dk thỏa mãn dc vào
    public List<UsersResponse> getUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    //@PostAuthorize("hasRole('ADMIN')") //kiểm tra sau khi thực hiện
    @PostAuthorize("returnObject.username==authentication.name")
    public UsersResponse getUserResponse(long id) {
        Users user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return mapToResponse(user);



    }
    public UsersResponse updateUser(Long id, UserUpdateRequest request) {
        Users users = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found")) ;

        users.setFirstName(request.getFirstName());
        users.setDob(request.getDob());

        users.setLastName(request.getLastName());
        PasswordEncoder passwordEncoder= new BCryptPasswordEncoder(10);
        users.setPassword(passwordEncoder.encode(request.getPassword()));
        return mapToResponse(userRepository.save(users));
    }

    private UsersResponse mapToResponse(Users user) {
        UsersResponse response = new UsersResponse();
        response.setId(user.getId());
        response.setFirstName(user.getFirstName());
        response.setDob(user.getDob());
        response.setUsername(user.getUsername());
        response.setLastName(user.getLastName());
       // response.setRoles(user.getRoles());
        return response;
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    public UsersResponse getMyInfo(){//lay thong tin dang login
        var context = SecurityContextHolder.getContext();
        String name=context.getAuthentication().getName();
        Users  user=userRepository.findByUsername(name).orElseThrow(
                ()->new AppException(ErrorCode.USER_NOT_EXISTED));
        return mapToResponse(user);
    }
}
