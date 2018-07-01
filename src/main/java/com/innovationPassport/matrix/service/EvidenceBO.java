package com.innovationPassport.matrix.service;

import com.innovationPassport.matrix.dto.EvidenceDTO;
import com.innovationPassport.matrix.dto.SearchDTO;
import com.innovationPassport.matrix.dto.response.ResponseDTO;
import com.innovationPassport.matrix.model.EvidenceEntity;
import com.innovationPassport.matrix.model.EvidenceHypotheseEntity;
import com.innovationPassport.matrix.model.TopicEntity;
import com.innovationPassport.matrix.model.UserEntity;
import com.innovationPassport.matrix.repository.EvidenceHypotheseRepo;
import com.innovationPassport.matrix.repository.EvidenceRepo;
import com.innovationPassport.matrix.repository.TopicRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EvidenceBO {

    @Autowired
    private EvidenceRepo evidenceRepo;

    @Autowired
    private TopicRepo topicRepo;

    @Autowired
    private EvidenceHypotheseRepo evidenceHypotheseRepo;

    @Autowired
    private AuthenticationBO authenticationBO;


    public ResponseDTO<List<EvidenceDTO>> search(SearchDTO<EvidenceDTO> searchDTO) {
        EvidenceEntity evidenceEntity = createExampleEntity(searchDTO);

        ExampleMatcher matcher = ExampleMatcher.matching()
                .withMatcher("evidence", match -> match.ignoreCase().contains())
                .withMatcher("source", match -> match.ignoreCase().contains());

        Page<EvidenceEntity> page = evidenceRepo.findAll(Example.of(evidenceEntity, matcher), searchDTO.toPageable());

        List<EvidenceDTO> content = page.getContent().stream().map(EvidenceDTO::new).collect(Collectors.toList());
        return new ResponseDTO<>(content, page.getTotalElements(), page.getTotalPages());
    }

    private EvidenceEntity createExampleEntity(SearchDTO<EvidenceDTO> searchDTO) {
        EvidenceEntity evidenceEntity = new EvidenceEntity();
        TopicEntity topicEntity = new TopicEntity();
        topicEntity.setId(searchDTO.getId());
        BeanUtils.copyProperties(searchDTO.getFilter(), evidenceEntity);
        evidenceEntity.setTopic(topicEntity);

        return evidenceEntity;
    }

    @Transactional
    public void create(EvidenceDTO evidenceDTO) {
        EvidenceEntity evidenceEntity = new EvidenceEntity();
        initEvidenceEntity(evidenceEntity, evidenceDTO);
        evidenceRepo.save(evidenceEntity);
        createHypotheseValues(evidenceEntity, evidenceDTO);
    }

    private void initEvidenceEntity(EvidenceEntity evidenceEntity, EvidenceDTO evidenceDTO) {
        TopicEntity topicEntity = topicRepo.findOne(evidenceDTO.getTopicId());
        UserEntity userEntity = authenticationBO.getLoggedUser();

        evidenceEntity.setTopic(topicEntity);
        evidenceEntity.setUser(userEntity);
        evidenceEntity.setEvidence(evidenceDTO.getEvidence());
        evidenceEntity.setSource(evidenceDTO.getSource());
        evidenceEntity.setCredibility(evidenceDTO.getCredibility());
    }

    private void createHypotheseValues(EvidenceEntity evidenceEntity, EvidenceDTO evidenceDTO) {
        evidenceDTO.getHypotheses().forEach((index, value) -> {
            EvidenceHypotheseEntity evidenceHypotheseEntity = new EvidenceHypotheseEntity();
            evidenceHypotheseEntity.setEvidence(evidenceEntity);
            evidenceHypotheseEntity.setValue(value);
            evidenceHypotheseEntity.setIndex(index);

            evidenceHypotheseRepo.save(evidenceHypotheseEntity);
        });
    }
}
