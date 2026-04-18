package com.cops.controller;

import com.cops.dto.ActivityDTO;
import com.cops.dto.DashboardResponse;
import com.cops.dto.TeacherStatsDTO;
import com.cops.response.ApiResponse;
import com.cops.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/stats")
    public ApiResponse<DashboardResponse> getStats() {

        DashboardResponse stats =
                dashboardService.getStats();

        ApiResponse<DashboardResponse> res =
                new ApiResponse<>();

        res.setSuccess(true);
        res.setMessage("OK");
        res.setData(stats);

        return res;
    }

    @GetMapping("/activity")
    public ApiResponse<List<ActivityDTO>> getWeeklyActivity() {
        List<ActivityDTO> activities = dashboardService.getWeeklyActivity();

        ApiResponse<List<ActivityDTO>> res = new ApiResponse<>();
        res.setSuccess(true);
        res.setMessage("OK");
        res.setData(activities);

        return res;
    }

    @GetMapping("/teacher-stats")
    public ApiResponse<TeacherStatsDTO> getTeacherStats() {
        TeacherStatsDTO stats = dashboardService.getTeacherStats();

        ApiResponse<TeacherStatsDTO> res = new ApiResponse<>();
        res.setSuccess(true);
        res.setMessage("OK");
        res.setData(stats);

        return res;
    }
}