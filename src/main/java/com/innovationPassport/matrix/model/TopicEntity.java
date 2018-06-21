package com.innovationPassport.matrix.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "topic", schema = "futurew_matrix")
public class TopicEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;
}
