package com.cops.service;

import com.cops.dto.ScheduleDTO;
import com.cops.entity.Schedule;
import com.cops.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    public List<ScheduleDTO> getAllSchedules() {
        List<Schedule> schedules = scheduleRepository.findAllSchedules();
        return schedules.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ScheduleDTO> getSchedulesByClass(Long classId) {
        List<Schedule> schedules = scheduleRepository.findByClassid(classId);
        return schedules.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ScheduleDTO convertToDTO(Schedule schedule) {
        ScheduleDTO dto = new ScheduleDTO();
        dto.setId(schedule.getId());
        dto.setDay(schedule.getDayofweek());
        if (schedule.getStarttime() != null) {
            dto.setTime(schedule.getStarttime().toString() + 
                       (schedule.getEndtime() != null ? " - " + schedule.getEndtime().toString() : ""));
        }
        return dto;
    }
}
