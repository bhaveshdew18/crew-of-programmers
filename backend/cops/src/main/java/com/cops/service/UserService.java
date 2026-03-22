package com.cops.service;

import com.cops.dto.LoginRequest;
import com.cops.dto.LoginResponse;
import com.cops.dto.RegisterRequest;
import com.cops.entity.User;
import com.cops.repository.UserRepository;
import com.cops.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    public User registerUser(RegisterRequest request){

        if(userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setPassword(request.getPassword());
        user.setEmail(request.getEmail());
        user.setRole(request.getRole());

        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public boolean existsByEmail(String email){
        return userRepository.existsByEmail(email);
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public LoginResponse loginUser(LoginRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (!user.getPassword()
                .equals(request.getPassword())) {

            throw new RuntimeException("Invalid password");
        }

        String token =
                jwtUtil.generateToken(user.getEmail());

        LoginResponse res = new LoginResponse();

        res.setToken(token);
        res.setEmail(user.getEmail());
        res.setRole(user.getRole().name());

        return res;
    }
}
