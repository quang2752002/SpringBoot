package com.example.demo.mapper;

import com.example.demo.dto.request.UserCreationRequest;
import com.example.demo.dto.request.UserUpdateRequest;
import com.example.demo.dto.response.UsersResponse;
import com.example.demo.entity.Users;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    Users toUsers(UserCreationRequest request);
    void updateUsers(@MappingTarget Users users, UserUpdateRequest request);

    UsersResponse toUserResponse(Users users);
}
