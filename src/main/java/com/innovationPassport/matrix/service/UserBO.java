package com.innovationPassport.matrix.service;

import com.innovationPassport.matrix.dto.UserDTO;
import com.innovationPassport.matrix.exception.ValidationException;
import com.innovationPassport.matrix.model.UserEntity;
import com.innovationPassport.matrix.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserBO {

    @Autowired
    private UserRepo userRepo;


    public UserDTO getUser(Integer id) throws ValidationException {
        UserEntity userEntity = userRepo.findOne(id);
        if (userEntity == null) {
            throw new ValidationException("There is no user with id: " + id);
        }

        return new UserDTO(userEntity);
    }

}
