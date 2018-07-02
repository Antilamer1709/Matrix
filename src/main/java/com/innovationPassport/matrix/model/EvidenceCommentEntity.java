package com.innovationPassport.matrix.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "evidence_comment", schema = "futurew_matrix")
public class EvidenceCommentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "evidence_id")
    private EvidenceEntity evidence;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(name = "comment")
    private String comment;

}
