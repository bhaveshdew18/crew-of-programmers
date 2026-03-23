package com.cops.controller;

import com.cops.entity.Attendance;
import com.cops.repository.AttendanceRepository;
import com.cops.response.ApiResponse;
import com.cops.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping("/mark")
    public ApiResponse<Attendance> mark(
            @RequestBody Attendance attendance
    ) {

        Attendance data =
                attendanceService.markAttendance(attendance);

        ApiResponse<Attendance> res =
                new ApiResponse<>();

        res.setSuccess(true);
        res.setMessage("Attendance saved");
        res.setData(data);

        return res;
    }

    @GetMapping("/user/{id}")
    public ApiResponse<List<Attendance>> getByUser(
            @PathVariable Long id
    ) {

        List<Attendance> list =
                attendanceService.getByUser(id);

        ApiResponse<List<Attendance>> res =
                new ApiResponse<>();

        res.setSuccess(true);
        res.setMessage("OK");
        res.setData(list);

        return res;
    }

    @GetMapping("/class/{classId}")
    public List<Attendance> getByClassId(@PathVariable Long classId) {
        return attendanceService.getByClass(classId);
    }

    @GetMapping("/date")
    public List<Attendance> getByDate(@RequestParam String date) {
        return attendanceService.getToday(LocalDate.parse(date));
    }
}
