package com.cops.repository;

import com.cops.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByClassid(Long classId);
    
    @Query("SELECT s FROM Schedule s WHERE s.classid IN (SELECT c.id FROM ClassRoom c) ORDER BY s.dayofweek")
    List<Schedule> findAllSchedules();
}
