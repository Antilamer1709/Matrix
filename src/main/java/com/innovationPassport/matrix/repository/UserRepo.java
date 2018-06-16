package com.innovationPassport.matrix.repository;

import com.innovationPassport.matrix.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<UserEntity, Integer> {

    UserEntity findByUsernameIgnoreCase(String login);

}
