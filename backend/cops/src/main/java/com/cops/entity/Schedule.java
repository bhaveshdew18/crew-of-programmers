package com.cops.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalTime;

@Entity
@Table(name = "schedule")
@Data
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long classid;
    private String dayofweek;
    private LocalTime starttime;
    private LocalTime endtime;
}
