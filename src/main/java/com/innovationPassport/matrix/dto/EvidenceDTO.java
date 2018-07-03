package com.innovationPassport.matrix.dto;

import com.innovationPassport.matrix.model.EvidenceEntity;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
public class EvidenceDTO {

    private Integer id;

    private Integer topicId;

    private Integer userId;

    private String evidence;

    private String source;

    private String credibility;

    private Map<Integer, String> hypotheses;

    private UserDTO creator;

    private List<EvidenceCommentDTO> comments;

    public EvidenceDTO() {
        this.hypotheses = new HashMap<>();
        this.comments = new ArrayList<>();
    }

    public EvidenceDTO(EvidenceEntity entity) {
        this();
        this.id = entity.getId();
        this.evidence = entity.getEvidence();
        this.source = entity.getSource();
        this.credibility = entity.getCredibility();
    }
}
