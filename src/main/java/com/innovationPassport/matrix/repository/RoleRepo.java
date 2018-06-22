package com.innovationPassport.matrix.repository;

import com.innovationPassport.matrix.model.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<RoleEntity, Integer> {

    RoleEntity findByCode(String code);
}
