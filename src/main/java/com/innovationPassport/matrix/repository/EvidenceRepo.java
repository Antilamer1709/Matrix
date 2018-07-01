package com.innovationPassport.matrix.repository;

import com.innovationPassport.matrix.dto.EvidenceDTO;
import com.innovationPassport.matrix.model.EvidenceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EvidenceRepo extends JpaRepository<EvidenceEntity, Integer>, AbstractPagedRepo<EvidenceEntity, EvidenceDTO> {

}
