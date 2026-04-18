package com.cops.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

    private long totalUsers;
    private long totalClasses;
    private long totalAttendance;
    private long todayAttendance;
    private int attendancePercentage;
    private int problemsSolved;
    private List<UpcomingClassDTO> upcomingClasses;
    private List<ActivityDTO> weeklyActivity;
}

