package com.innovationPassport.matrix.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "evidence_hypothese", schema = "futurew_matrix")
public class EvidenceHypotheseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "evidence_id")
    private EvidenceEntity evidence;

    @Column(name = "value")
    private String value;

    @Column(name="\"index\"")
    private Integer index;

}
