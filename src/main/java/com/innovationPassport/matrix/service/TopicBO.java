package com.innovationPassport.matrix.service;

import com.innovationPassport.matrix.dto.TopicDTO;
import com.innovationPassport.matrix.exception.ValidationException;
import com.innovationPassport.matrix.model.TopicEntity;
import com.innovationPassport.matrix.model.TpoicHypotheseEntity;
import com.innovationPassport.matrix.repository.TopicRepo;
import com.innovationPassport.matrix.repository.TpoicHypotheseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TopicBO {

    @Autowired
    private TopicRepo topicRepo;

    @Autowired
    private TpoicHypotheseRepo tpoicHypotheseRepo;


    public List<TopicDTO> getAllTopics() {
        List<TopicEntity> entities = topicRepo.findAll();
        return entities.stream().map(TopicDTO::new).collect(Collectors.toList());
    }

    @Transactional
    public void create(TopicDTO topicDTO) {
        TopicEntity topicEntity = new TopicEntity();
        topicEntity.setName(topicDTO.getName());
        topicEntity.setDescription(topicDTO.getDescription());

        topicRepo.save(topicEntity);
        createHypotheses(topicDTO, topicEntity);
    }

    private void createHypotheses(TopicDTO topicDTO, TopicEntity topicEntity) {
        topicDTO.getHypotheses().forEach(hypothese -> {
            TpoicHypotheseEntity hypotheseEntity = new TpoicHypotheseEntity();
            hypotheseEntity.setTopic(topicEntity);
            hypotheseEntity.setHypothese(hypothese);

            tpoicHypotheseRepo.save(hypotheseEntity);
        });
    }

    @Transactional
    public TopicDTO getTopic(Integer id) throws ValidationException {
        TopicEntity topicEntity = topicRepo.getOne(id);

        if (topicEntity == null) {
            throw new ValidationException("There is no topic with id: " + id);
        }
        TopicDTO topicDTO = new TopicDTO(topicEntity);
        topicDTO.setHypotheses(topicEntity.getHypotheses().stream().map(TpoicHypotheseEntity::getHypothese).collect(Collectors.toList()));

        return topicDTO;
    }

    @Transactional
    public void delete(TopicDTO topicDTO) {
        TopicEntity topicEntity = topicRepo.findOne(topicDTO.getId());

        topicRepo.delete(topicEntity);
    }
}
