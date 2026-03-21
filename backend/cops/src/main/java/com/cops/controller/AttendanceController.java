package com.cops.controller;

import com.cops.entity.Attendance;
import com.cops.repository.AttendanceRepository;
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
    public Attendance mark(@RequestBody Attendance attendance) {
        return attendanceService.markAttendance(attendance);
    }

    @GetMapping("/user/userId")
    public List<Attendance> getByUser(@PathVariable Long userId) {
        return attendanceService.getByUser(userId);
    }

    @GetMapping("/class/classId")
    public List<Attendance> getByClassId(@PathVariable Long classId) {
        return attendanceService.getByClass(classId);
    }

    @GetMapping("/date")
    public List<Attendance> getByDate(@RequestParam String date) {
        return attendanceService.getToday(LocalDate.parse(date));
    }
}
