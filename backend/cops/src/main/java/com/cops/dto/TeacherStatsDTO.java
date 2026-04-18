package com.cops.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeacherStatsDTO {
    private long totalStudents;
    private long activeClassrooms;
    private List<ScheduleDTO> todaySchedule;
}
