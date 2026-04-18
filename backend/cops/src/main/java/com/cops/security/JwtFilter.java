package com.cops.security;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

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
            response.setContentType("application/json");

            response.getWriter().write(
                    "{\"success\":false,\"message\":\"No token\"}"
            );

            return;
        }

        String token =
                header.substring(7);

        try {

            String email = jwtUtil.extractEmail(token);
            String role = jwtUtil.extractRole(token);

            UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(
                            email,
                            null,
                            List.of(new SimpleGrantedAuthority("ROLE_" + role))
                    );

            SecurityContextHolder
                    .getContext()
                    .setAuthentication(auth);

        } catch (Exception e) {

            response.setStatus(401);
            response.setContentType("application/json");

            response.getWriter().write(
                    "{\"success\":false,\"message\":\"Invalid token\"}"
            );

            return;
        }

        chain.doFilter(request, response);
    }
}