package com.innovationPassport.matrix.model;

import lombok.Data;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "evidence", schema = "futurew_matrix")
public class EvidenceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id")
    private TopicEntity topic;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(name = "evidence")
    private String evidence;

    @Column(name = "source")
    private String source;

    @Column(name = "credibility")
    private String credibility;

    @OneToMany(mappedBy = "evidence", fetch = FetchType.LAZY)
    @Fetch(FetchMode.SUBSELECT)
    private List<EvidenceHypotheseEntity> evidenceHypotheses;

}
