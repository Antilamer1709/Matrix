package com.innovationPassport.matrix.dto;

import com.innovationPassport.matrix.model.TopicEntity;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class TopicDTO {

    private Integer id;

    private String name;

    private List<EvidenceDTO> evidences;


    public TopicDTO() {
        this.evidences = new ArrayList<>();
    }

    public TopicDTO(TopicEntity entity) {
        this();
        this.id = entity.getId();
        this.name = entity.getName();
    }
}
