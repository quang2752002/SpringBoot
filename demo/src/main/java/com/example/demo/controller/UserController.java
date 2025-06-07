package com.example.demo.controller;

import com.example.demo.dto.request.ApiResponse;
import com.example.demo.dto.request.UserCreationRequest;
import com.example.demo.dto.request.UserUpdateRequest;
import com.example.demo.dto.response.UsersResponse;
import com.example.demo.entity.Users;
import com.example.demo.service.UsersService;
import com.nimbusds.jose.proc.SecurityContext;
import lombok.extern.slf4j.Slf4j;
import lombok.var;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UsersService usersService;

    @PostMapping("/create")
    public ApiResponse<Users> createUser(@RequestBody @Valid UserCreationRequest request){
        ApiResponse<Users> usersApiResponse=new ApiResponse<>();
        usersApiResponse.setResult(usersService.createRequest((request)));
        return usersApiResponse;
    }
    @GetMapping("/getAll")
    public ApiResponse<List<UsersResponse>> getUsers(){
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("Username {}",authentication.getName());
        authentication.getAuthorities().forEach(grantedAuthority -> log.info(grantedAuthority.getAuthority()));
        return ApiResponse.<List<UsersResponse>>builder()
                .result(usersService.getUsers())
                .build();
    }
    @GetMapping("/{userId}")
    UsersResponse getUser(@PathVariable("userId") Long userId){
        return  usersService.getUserResponse(userId);
    }
    @GetMapping("/myInfo")
    UsersResponse getMyInfo(){
        return  usersService.getMyInfo();
    }
    @PutMapping("/{userId}")
    public UsersResponse updateUser(@PathVariable Long userId,@RequestBody UserUpdateRequest request){
        return  usersService.updateUser(userId,request);
    }
    @DeleteMapping("/{userId}")
    public String deleteUser(@PathVariable Long userId){
        usersService.deleteUser(userId);
        return "User has been deleted";
    }
}
