package com.cops.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "attendance")
@Data
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Long classId;

    private LocalDate date;

    @Enumerated(EnumType.STRING)
    private AttendanceStatus status;

    private LocalDateTime createdAt;

}
