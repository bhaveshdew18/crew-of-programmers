package com.cops.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpcomingClassDTO {
    private Long id;
    private String subject;
    private String time;
    private String instructor;
}
