package com.cops.repository;

import com.cops.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance,Long> {

    List<Attendance> findByClassId(Long classId);
    List<Attendance> findByUserId(Long userId);
    List<Attendance> findByDate(LocalDate date);
    List<Attendance> findByUserIdAndDate(Long userId, LocalDate date);
}
