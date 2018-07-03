package com.innovationPassport.matrix.service;

import com.innovationPassport.matrix.dto.EvidenceDTO;
import com.innovationPassport.matrix.dto.SearchDTO;
import com.innovationPassport.matrix.dto.UserDTO;
import com.innovationPassport.matrix.dto.response.ResponseDTO;
import com.innovationPassport.matrix.exception.ValidationException;
import com.innovationPassport.matrix.model.EvidenceEntity;
import com.innovationPassport.matrix.model.UserEntity;
import com.innovationPassport.matrix.repository.EvidenceRepo;
import com.innovationPassport.matrix.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserBO {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private EvidenceRepo evidenceRepo;


    public UserDTO getUser(Integer id) throws ValidationException {
        UserEntity userEntity = userRepo.findOne(id);
        if (userEntity == null) {
            throw new ValidationException("There is no user with id: " + id);
        }

        return new UserDTO(userEntity);
    }

    @Transactional
    public ResponseDTO<List<EvidenceDTO>> searchEvidence(SearchDTO<EvidenceDTO> searchDTO) {
        Page<EvidenceEntity> page = evidenceRepo.getPagedData(searchDTO);

        List<EvidenceDTO> content = page.getContent().stream().map(this::createEvidenceDTO).collect(Collectors.toList());
        return new ResponseDTO<>(content, page.getTotalElements(), page.getTotalPages());
    }

    private EvidenceDTO createEvidenceDTO(EvidenceEntity entity) {
        EvidenceDTO evidenceDTO = new EvidenceDTO(entity);
        evidenceDTO.setTopicId(entity.getTopic().getId());
        return evidenceDTO;
    }

}
