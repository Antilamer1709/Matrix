package com.innovationPassport.matrix.service;

import com.innovationPassport.matrix.dto.EvidenceDTO;
import com.innovationPassport.matrix.dto.SearchDTO;
import com.innovationPassport.matrix.dto.response.ResponseDTO;
import com.innovationPassport.matrix.model.EvidenceEntity;
import com.innovationPassport.matrix.repository.EvidenceRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EvidenceBO {

    @Autowired
    private EvidenceRepo evidenceRepo;


    public ResponseDTO<List<EvidenceDTO>> search(SearchDTO<EvidenceDTO> searchDTO) {
        EvidenceEntity entity = new EvidenceEntity();
        BeanUtils.copyProperties(searchDTO.getFilter(), entity);
        ExampleMatcher matcher = ExampleMatcher.matching()
                .withMatcher("evidence", match -> match.ignoreCase().contains())
                .withMatcher("source", match -> match.ignoreCase().contains());

        Page<EvidenceEntity> page = evidenceRepo.findAll(Example.of(entity, matcher), searchDTO.toPageable());

        List<EvidenceDTO> content = page.getContent().stream().map(EvidenceDTO::new).collect(Collectors.toList());
        return new ResponseDTO<>(content, page.getTotalElements(), page.getTotalPages());
    }

}
