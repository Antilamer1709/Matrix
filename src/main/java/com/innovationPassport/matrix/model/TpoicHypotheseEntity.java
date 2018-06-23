package com.innovationPassport.matrix.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "topic_hypothese", schema = "futurew_matrix")
public class TpoicHypotheseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id")
    private TopicEntity topic;

    @Column(name = "hypothese")
    private String hypothese;

}
