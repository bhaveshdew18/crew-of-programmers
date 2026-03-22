package com.cops.security;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.rmi.RemoteException;

@Component
public class JwtFilter implements Filter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public void doFilter(
            ServletRequest request,
            ServletResponse response,
            FilterChain chain
    ) throws IOException, ServletException {

        HttpServletRequest req =
                (HttpServletRequest) request;

        String path = req.getRequestURI();

        // allow login & register
        if (path.contains("/login") ||
                path.contains("/register")) {

            chain.doFilter(request, response);
            return;
        }

        String header =
                req.getHeader("Authorization");

        if (header == null ||
                !header.startsWith("Bearer ")) {

            throw new RuntimeException("No token");
        }

        String token =
                header.substring(7);

        try {

            String role =
                    jwtUtil.extractRole(token);

            System.out.println(
                    "Role: " + role
            );

            if (path.contains("/attendance")
                    && role.equals("STUDENT")) {

                throw new RuntimeException(
                        "Not allowed");
            }

            String email =
                    jwtUtil.extractEmail(token);

            System.out.println(
                    "Valid token: " + email);

        } catch (Exception e) {

            throw new RuntimeException("Invalid token");
        }

        chain.doFilter(request, response);
    }
}