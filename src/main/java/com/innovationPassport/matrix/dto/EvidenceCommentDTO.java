package com.innovationPassport.matrix.dto;

import lombok.Data;

@Data
public class EvidenceCommentDTO {

    private Integer id;

    private Integer evidenceId;

    private UserDTO user;

    private String comment;
}