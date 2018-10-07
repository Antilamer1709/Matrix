package com.innovationPassport.matrix.dto;

import com.innovationPassport.matrix.model.TopicEntity;
import lombok.Data;

import java.util.List;

@Data
public class TopicDTO {

    private Integer id;

    private String name;

    private String description;

    private List<String> hypotheses;



    public TopicDTO() {
    }

    public TopicDTO(TopicEntity entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.description = entity.getDescription();
    }
}
