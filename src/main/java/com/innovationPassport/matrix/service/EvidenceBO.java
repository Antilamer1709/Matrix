package com.innovationPassport.matrix.service;

import com.innovationPassport.matrix.dto.EvidenceCommentDTO;
import com.innovationPassport.matrix.dto.EvidenceDTO;
import com.innovationPassport.matrix.dto.SearchDTO;
import com.innovationPassport.matrix.dto.UserDTO;
import com.innovationPassport.matrix.dto.response.ResponseDTO;
import com.innovationPassport.matrix.exception.ValidationException;
import com.innovationPassport.matrix.model.*;
import com.innovationPassport.matrix.repository.EvidenceCommentRepo;
import com.innovationPassport.matrix.repository.EvidenceHypotheseRepo;
import com.innovationPassport.matrix.repository.EvidenceRepo;
import com.innovationPassport.matrix.repository.TopicRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
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
    private EvidenceCommentRepo evidenceCommentRepo;

    @Autowired
    private AuthenticationBO authenticationBO;


    public ResponseDTO<List<EvidenceDTO>> search(SearchDTO<EvidenceDTO> searchDTO) {
        Page<EvidenceEntity> page = evidenceRepo.getPagedData(searchDTO);

        List<EvidenceDTO> content = page.getContent().stream().map(this::createEvidenceDTO).collect(Collectors.toList());
        return new ResponseDTO<>(content, page.getTotalElements(), page.getTotalPages());
    }

    private EvidenceDTO createEvidenceDTO(EvidenceEntity entity) {
        EvidenceDTO evidenceDTO = new EvidenceDTO(entity);
        entity.getEvidenceHypotheses().forEach(x -> evidenceDTO.getHypotheses().put(x.getPosition(), x.getValue()));
        return evidenceDTO;
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
            evidenceHypotheseEntity.setPosition(index);

            evidenceHypotheseRepo.save(evidenceHypotheseEntity);
        });
    }

    @Transactional
    public void edit(EvidenceDTO evidenceDTO) {
        EvidenceEntity evidenceEntity = evidenceRepo.findOne(evidenceDTO.getId());
        initEvidenceEntity(evidenceEntity, evidenceDTO);
        evidenceRepo.save(evidenceEntity);
        deleteOldHypotheseValues(evidenceEntity);
        createHypotheseValues(evidenceEntity, evidenceDTO);
    }

    private void deleteOldHypotheseValues(EvidenceEntity evidenceEntity) {
        evidenceHypotheseRepo.delete(evidenceEntity.getEvidenceHypotheses());
    }

    @Transactional
    public EvidenceDTO getEvidence(Integer id) throws ValidationException {
        EvidenceEntity evidenceEntity = evidenceRepo.findOne(id);

        if (evidenceEntity == null) {
            throw new ValidationException("There is no evidence with id: " + id);
        }
        EvidenceDTO evidenceDTO = new EvidenceDTO(evidenceEntity);
        evidenceEntity.getEvidenceHypotheses().forEach(x -> evidenceDTO.getHypotheses().put(x.getPosition(), x.getValue()));
        evidenceDTO.setTopicId(evidenceEntity.getTopic().getId());
        evidenceDTO.setCreator(new UserDTO(evidenceEntity.getUser()));

        return evidenceDTO;
    }

    @Transactional
    public void addComment(EvidenceCommentDTO commentDTO) {
        EvidenceCommentEntity commentEntity = new EvidenceCommentEntity();
        initComment(commentEntity, commentDTO);
        evidenceCommentRepo.save(commentEntity);
    }

    private void initComment(EvidenceCommentEntity commentEntity, EvidenceCommentDTO commentDTO) {
        EvidenceEntity evidenceEntity = evidenceRepo.findOne(commentDTO.getEvidenceId());
        UserEntity userEntity = authenticationBO.getLoggedUser();

        commentEntity.setUser(userEntity);
        commentEntity.setEvidence(evidenceEntity);
        commentEntity.setComment(commentDTO.getComment());
    }

    @Transactional
    public ResponseDTO<List<EvidenceCommentDTO>> searchComments(SearchDTO<EvidenceCommentDTO> searchDTO) {
        Page<EvidenceCommentEntity> page = evidenceCommentRepo.getPagedData(searchDTO);

        List<EvidenceCommentDTO> content = page.getContent().stream().map(this::createCommentDTO).collect(Collectors.toList());
        return new ResponseDTO<>(content, page.getTotalElements(), page.getTotalPages());
    }

    private EvidenceCommentDTO createCommentDTO(EvidenceCommentEntity commentEntity) {
        EvidenceCommentDTO commentDTO = new EvidenceCommentDTO();
        BeanUtils.copyProperties(commentEntity, commentDTO);
        commentDTO.setUser(new UserDTO(commentEntity.getUser()));

        return commentDTO;
    }

    @Transactional
    public void deleteComment(EvidenceCommentDTO commentDTO) throws ValidationException {
        EvidenceCommentEntity commentEntity = evidenceCommentRepo.findOne(commentDTO.getId());
        validateDeleteComment(commentEntity);

        evidenceCommentRepo.delete(commentEntity);
    }

    private void validateDeleteComment(EvidenceCommentEntity commentEntity) throws ValidationException {
        if (commentEntity == null) {
            throw new ValidationException("There is no such comment in database!");
        }
    }
}
