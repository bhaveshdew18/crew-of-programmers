package com.cops.service;

import com.cops.dto.ActivityDTO;
import com.cops.dto.DashboardResponse;
import com.cops.dto.TeacherStatsDTO;
import com.cops.dto.UpcomingClassDTO;
import com.cops.repository.AttendanceRepository;
import com.cops.repository.ClassRoomRepository;
import com.cops.repository.UserRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClassRoomRepository classRoomRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private ScheduleService scheduleService;

    public DashboardResponse getStats() {
        DashboardResponse res = new DashboardResponse();

        res.setTotalUsers(userRepository.count());
        res.setTotalClasses(classRoomRepository.count());
        res.setTodayAttendance(attendanceRepository.findByDate(LocalDate.now()).size());
        
        // Calculate attendance percentage (mock: 88%)
        res.setAttendancePercentage(88);
        
        // Mock problems solved
        res.setProblemsSolved(42);
        
        // Get upcoming classes
        res.setUpcomingClasses(getUpcomingClasses());
        
        // Get weekly activity
        res.setWeeklyActivity(getWeeklyActivity());

        return res;
    }

    private List<UpcomingClassDTO> getUpcomingClasses() {
        List<UpcomingClassDTO> upcomingClasses = new ArrayList<>();
        upcomingClasses.add(new UpcomingClassDTO(1L, "Data Structures & Algorithms", "10:00 AM Today", "Dr. Smith"));
        upcomingClasses.add(new UpcomingClassDTO(2L, "Database Management", "01:30 PM Today", "Prof. Johnson"));
        upcomingClasses.add(new UpcomingClassDTO(3L, "Computer Networks", "09:00 AM Tomorrow", "Dr. Alan"));
        return upcomingClasses;
    }

    public List<ActivityDTO> getWeeklyActivity() {
        List<ActivityDTO> activities = new ArrayList<>();
        String[] days = {"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"};
        int[] problems = {5, 8, 2, 12, 6, 15, 7};

        for (int i = 0; i < days.length; i++) {
            activities.add(new ActivityDTO(days[i], problems[i]));
        }

        return activities;
    }

    public TeacherStatsDTO getTeacherStats() {
        TeacherStatsDTO stats = new TeacherStatsDTO();
        stats.setTotalStudents(userRepository.count());
        stats.setActiveClassrooms(classRoomRepository.count());
        stats.setTodaySchedule(scheduleService.getAllSchedules());
        return stats;
    }
}
