package com.cops.service;

import com.cops.dto.DashboardResponse;
import com.cops.repository.AttendanceRepository;
import com.cops.repository.ClassRoomRepository;
import com.cops.repository.UserRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class DashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClassRoomRepository classRoomRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    public DashboardResponse getStats() {
        DashboardResponse res = new DashboardResponse();

        res.setTotalUsers(userRepository.count());
        res.setTotalClasses(classRoomRepository.count());
        res.setTodayAttendance(attendanceRepository.count());

        long today = attendanceRepository.findByDate(LocalDate.now()).size();
        res.setTodayAttendance(today);

        return res;
    }
}
