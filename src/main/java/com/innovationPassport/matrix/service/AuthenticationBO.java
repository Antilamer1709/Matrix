package com.innovationPassport.matrix.service;

import com.innovationPassport.matrix.dto.UserDTO;
import com.innovationPassport.matrix.model.UserEntity;
import com.innovationPassport.matrix.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationBO {

    @Autowired
    private UserRepo userRepo;

    public UserEntity getLoggedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        for (GrantedAuthority authority : authentication.getAuthorities()) {
            if (authority.getAuthority().equals("ROLE_ANONYMOUS")) {
                return null;
            }
        }
        return (UserEntity) authentication.getPrincipal();
    }

    public UserDTO getLoggedUserDTO() {
        UserEntity user = getLoggedUser();
        if (user != null) {
            return new UserDTO(user);
        } else {
            return new UserDTO();
        }
    }
}
