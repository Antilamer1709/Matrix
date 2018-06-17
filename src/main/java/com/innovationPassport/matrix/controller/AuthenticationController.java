package com.innovationPassport.matrix.controller;

import com.innovationPassport.matrix.dto.RegistrationDTO;
import com.innovationPassport.matrix.dto.UserDTO;
import com.innovationPassport.matrix.exception.ValidationException;
import com.innovationPassport.matrix.service.AuthenticationBO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/authentication")
public class AuthenticationController {

    @Autowired
    private AuthenticationBO authenticationBO;

    @PostMapping(value = "/registration")
    @ResponseStatus(value = HttpStatus.OK)
    public void registration(@RequestBody RegistrationDTO registrationDTO) throws ValidationException {
        authenticationBO.registerUser(registrationDTO);
    }

    @PostMapping(value = "/loggedUser")
    public UserDTO loggedUser() throws Exception {
        return authenticationBO.getLoggedUserDTO();
    }

}
