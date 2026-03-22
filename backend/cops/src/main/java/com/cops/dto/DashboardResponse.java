package com.cops.dto;

import lombok.Data;

@Data
public class DashboardResponse {

    private long totalUsers;
    private long totalClasses;
    private long totalAttendance;
    private long todayAttendance;

}
