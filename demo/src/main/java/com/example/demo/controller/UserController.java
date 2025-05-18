package com.example.demo.controller;

import com.example.demo.dto.request.ApiResponse;
import com.example.demo.dto.request.UserCreationRequest;
import com.example.demo.dto.request.UserUpdateRequest;
import com.example.demo.dto.response.UsersResponse;
import com.example.demo.entity.Users;
import com.example.demo.service.UsersService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UsersService usersService;

    @PostMapping()
    public ApiResponse<Users> createUser(@RequestBody @Valid UserCreationRequest request){
        ApiResponse<Users> usersApiResponse=new ApiResponse<>();
        usersApiResponse.setResult(usersService.createRequest((request)));
        return usersApiResponse;
    }
    @GetMapping()
    public List<Users> getUsers(){
        return usersService.getUsers();
    }
    @GetMapping("/{userId}")
    UsersResponse getUser(@PathVariable("userId") Long userId){
        return  usersService.getUserResponse(userId);
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
