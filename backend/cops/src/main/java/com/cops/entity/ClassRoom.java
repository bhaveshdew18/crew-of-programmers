package com.cops.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "classes")
@Data
public class ClassRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String classname;

    private String subject;

    private Long teacherid;

    private LocalDateTime createdAt;
}
