package com.cops.service;

import com.cops.entity.Attendance;
import com.cops.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    public Attendance markAttendance(Attendance attendance) {

        LocalDate today = LocalDate.now();

        List<Attendance> existing = attendanceRepository.findByUserIdAndDate(attendance.getUserId(), today);

        if(!existing.isEmpty()){
            throw new RuntimeException("Attendance already exists");
        }

        attendance.setDate(today);
        attendance.setCreatedAt(LocalDateTime.now());

        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getByUser(Long userId) {
        return attendanceRepository.findByUserId(userId);
    }

    public List<Attendance> getByClass(Long classId) {
        return attendanceRepository.findByClassId(classId);
    }

    public List<Attendance> getToday(LocalDate date) {
        return attendanceRepository.findByDate(date);
    }
}
