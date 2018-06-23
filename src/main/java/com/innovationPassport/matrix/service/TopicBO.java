package com.innovationPassport.matrix.service;

import com.innovationPassport.matrix.dto.TopicDTO;
import com.innovationPassport.matrix.exception.ValidationException;
import com.innovationPassport.matrix.model.TopicEntity;
import com.innovationPassport.matrix.repository.TopicRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public void create(TopicDTO topicDTO) {
        TopicEntity topicEntity = new TopicEntity();
        topicEntity.setName(topicDTO.getName());

        topicRepo.save(topicEntity);
    }

    public TopicDTO getTopic(Integer id) throws ValidationException {
        TopicEntity topicEntity = topicRepo.getOne(id);
        if (topicEntity == null) {
            throw new ValidationException("There no topic with id: " + id);
        }
        return new TopicDTO(topicEntity);
    }
}
