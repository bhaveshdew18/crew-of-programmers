package com.cops.controller;

import com.cops.dto.ScheduleDTO;
import com.cops.response.ApiResponse;
import com.cops.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @GetMapping("/all")
    public ApiResponse<List<ScheduleDTO>> getAllSchedules() {
        List<ScheduleDTO> schedules = scheduleService.getAllSchedules();

        ApiResponse<List<ScheduleDTO>> res = new ApiResponse<>();
        res.setSuccess(true);
        res.setMessage("OK");
        res.setData(schedules);

        return res;
    }

    @GetMapping("/class/{classId}")
    public ApiResponse<List<ScheduleDTO>> getSchedulesByClass(@PathVariable Long classId) {
        List<ScheduleDTO> schedules = scheduleService.getSchedulesByClass(classId);

        ApiResponse<List<ScheduleDTO>> res = new ApiResponse<>();
        res.setSuccess(true);
        res.setMessage("OK");
        res.setData(schedules);

        return res;
    }
}
