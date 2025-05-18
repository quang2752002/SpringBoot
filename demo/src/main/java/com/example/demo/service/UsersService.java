package com.example.demo.service;

import com.example.demo.dto.request.UserCreationRequest;
import com.example.demo.dto.request.UserUpdateRequest;
import com.example.demo.dto.response.UsersResponse;
import com.example.demo.entity.Users;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.mapper.UserMapper;
import com.example.demo.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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

        Users users = userMapper.toUsers(request);
        return userRepository.save(users);
    }

    public List<Users> getUsers() {
        return userRepository.findAll();
    }


    public UsersResponse getUserResponse(long id) {
        return userMapper.toUserResponse(userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"))) ;
    }
    public UsersResponse updateUser(Long id, UserUpdateRequest request) {
        Users users = userRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("User not found")) ;
        userMapper.updateUsers(users, request);
        return userMapper.toUserResponse(userRepository.save(users));
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
