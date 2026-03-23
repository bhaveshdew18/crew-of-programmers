package com.cops.controller;

import com.cops.dto.LoginRequest;
import com.cops.dto.LoginResponse;
import com.cops.dto.RegisterRequest;
import com.cops.entity.User;
import com.cops.repository.UserRepository;
import com.cops.response.ApiResponse;
import com.cops.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ApiResponse<User> register(
            @RequestBody RegisterRequest request
    ) {

        User user =
                userService.registerUser(request);

        ApiResponse<User> res =
                new ApiResponse<>();

        res.setSuccess(true);
        res.setMessage("User created");
        res.setData(user);

        return res;
    }

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(
            @RequestBody LoginRequest request
    ) {

        LoginResponse data =
                userService.loginUser(request);

        ApiResponse<LoginResponse> res =
                new ApiResponse<>();

        res.setSuccess(true);
        res.setMessage("Login success");
        res.setData(data);

        return res;
    }

    @GetMapping("/all")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }
}
