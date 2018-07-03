package com.innovationPassport.matrix.repository;

import com.innovationPassport.matrix.dto.EvidenceCommentDTO;
import com.innovationPassport.matrix.model.EvidenceCommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EvidenceCommentRepo extends JpaRepository<EvidenceCommentEntity, Integer>, AbstractPagedRepo<EvidenceCommentEntity, EvidenceCommentDTO> {
}
