package com.innovationPassport.matrix.dto;

import com.innovationPassport.matrix.model.EvidenceEntity;
import lombok.Data;

@Data
public class EvidenceDTO {

    private Integer id;

    private String evidence;

    private String source;

    public EvidenceDTO() {
    }

    public EvidenceDTO(EvidenceEntity entity) {
        this.id = entity.getId();
        this.evidence = entity.getEvidence();
        this.source = entity.getSource();
    }
}
