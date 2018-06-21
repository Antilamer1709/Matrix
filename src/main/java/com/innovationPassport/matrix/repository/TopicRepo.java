package com.innovationPassport.matrix.repository;

import com.innovationPassport.matrix.model.TopicEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepo extends JpaRepository<TopicEntity, Integer> {
}
