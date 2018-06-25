package com.innovationPassport.matrix.dto;

import com.innovationPassport.matrix.model.EvidenceEntity;
import lombok.Data;

import java.util.Map;

@Data
public class EvidenceDTO {

    private Integer id;

    private Integer topicId;

    private String evidence;

    private String source;

    private String credibility;

    private Map<Integer, String> hypotheses;

    public EvidenceDTO() {
    }

    public EvidenceDTO(EvidenceEntity entity) {
        this.id = entity.getId();
        this.evidence = entity.getEvidence();
        this.source = entity.getSource();
    }
}
