package com.innovationPassport.matrix.service;

import com.innovationPassport.matrix.dto.TopicDTO;
import com.innovationPassport.matrix.model.TopicEntity;
import com.innovationPassport.matrix.repository.TopicRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TopicBO {

    @Autowired
    private TopicRepo topicRepo;


    public List<TopicDTO> getAllTopics() {
        List<TopicEntity> entities = topicRepo.findAll();
        return entities.stream().map(TopicDTO::new).collect(Collectors.toList());
    }
}
