package com.innovationPassport.matrix.service;

import com.innovationPassport.matrix.dto.RegistrationDTO;
import com.innovationPassport.matrix.dto.UserDTO;
import com.innovationPassport.matrix.enums.UserRole;
import com.innovationPassport.matrix.exception.ValidationException;
import com.innovationPassport.matrix.model.RoleEntity;
import com.innovationPassport.matrix.model.UserEntity;
import com.innovationPassport.matrix.repository.RoleRepo;
import com.innovationPassport.matrix.repository.UserRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Slf4j
@Service
public class AuthenticationBO {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RoleRepo roleRepo;

    public UserEntity getLoggedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        for (GrantedAuthority authority : authentication.getAuthorities()) {
            if (authority.getAuthority().equals("ROLE_ANONYMOUS")) {
                return null;
            }
        }
        return (UserEntity) authentication.getPrincipal();
    }

    @Transactional
    public UserDTO getLoggedUserDTO() {
        UserEntity user = getLoggedUser();
        if (user != null) {
            UserDTO userDTO = new UserDTO(user);
            user.getRoles().forEach(x -> userDTO.getRoles().add(x.getCode()));
            log.debug("*** getLoggedUserDTO() userDTO: " + userDTO);
            return userDTO;
        } else {
            log.debug("*** getLoggedUserDTO() userDTO: anonymous");
            return new UserDTO();
        }
    }

    @Transactional
    public void registerUser(RegistrationDTO registrationDTO) throws ValidationException {
        validateRegistration(registrationDTO);
        UserEntity user = new UserEntity();
        initUser(user, registrationDTO);
        addUserRoles(user, UserRole.USER);
        userRepo.save(user);
    }

    private void validateRegistration(RegistrationDTO registrationDTO) throws ValidationException {
        if (registrationDTO.hasNullFields() || registrationDTO.hasEmptyFields()) {
            throw new ValidationException("Registration object is not valid!");
        }
        UserEntity user = userRepo.findByUsernameIgnoreCase(registrationDTO.getUsername());
        if (user != null) {
            throw new ValidationException("User with the same username is already registered!");
        }
    }

    private void initUser(UserEntity user, RegistrationDTO registrationDTO) {
        user.setFirstName(registrationDTO.getFirstName());
        user.setLastName(registrationDTO.getLastName());
        user.setUsername(registrationDTO.getUsername());
        user.setPassword(registrationDTO.getPassword()); //TODO implement encoding!
    }

    private void addUserRoles(UserEntity user, UserRole... userRoles) {
        if (user.getRoles() == null) {
            user.setRoles(new ArrayList<>());
        }

        for (UserRole userRole : userRoles) {
            RoleEntity roleEntity = roleRepo.findByCode(userRole.getValue());
            user.getRoles().add(roleEntity);
        }
    }

}
