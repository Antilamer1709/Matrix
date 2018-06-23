package com.innovationPassport.matrix.model;

import lombok.Data;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "topic", schema = "futurew_matrix")
public class TopicEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @OneToMany(mappedBy = "topic", fetch = FetchType.LAZY)
    @Fetch(FetchMode.SUBSELECT)
    private List<EvidenceEntity> evidences;

    @Column(name = "name")
    private String name;
}
