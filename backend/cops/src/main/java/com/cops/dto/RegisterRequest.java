package com.cops.dto;

import com.cops.entity.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class RegisterRequest {

    @JsonProperty("fullName")
    private String name;
    
    private String email;
    private String password;
    private Role role;
}
