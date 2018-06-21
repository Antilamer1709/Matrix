package com.innovationPassport.matrix.dto;

import com.innovationPassport.matrix.model.TopicEntity;
import lombok.Data;

@Data
public class TopicDTO {

    private Integer id;

    private String name;


    public TopicDTO(TopicEntity entity) {
        this.id = entity.getId();
        this.name = entity.getName();
    }
}
