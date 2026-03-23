package com.cops.security;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain
    ) throws ServletException, IOException {

        String path = request.getRequestURI();

        if (path.contains("/login") ||
                path.contains("/register")) {

            chain.doFilter(request, response);
            return;
        }

        String header =
                request.getHeader("Authorization");

        if (header == null ||
                !header.startsWith("Bearer ")) {

            response.setStatus(401);
            return;
        }

        String token =
                header.substring(7);

        try {

            String email =
                    jwtUtil.extractEmail(token);

            String role =
                    jwtUtil.extractRole(token);

            System.out.println(email);
            System.out.println(role);

        } catch (Exception e) {

            response.setStatus(401);
            return;
        }

        chain.doFilter(request, response);
    }
}