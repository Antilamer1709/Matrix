package com.innovationPassport.matrix.repository;

import com.innovationPassport.matrix.model.EvidenceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EvidenceRepo extends JpaRepository<EvidenceEntity, Integer> {
}
