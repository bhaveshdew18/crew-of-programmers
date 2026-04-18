package com.cops.dto;

import com.cops.entity.Role;
import lombok.Data;

@Data
public class LoginRequest {

    private String email;
    private String password;
    private Role role;
}
