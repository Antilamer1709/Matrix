package com.innovationPassport.matrix.controller;

import com.innovationPassport.matrix.dto.UserDTO;
import com.innovationPassport.matrix.exception.ValidationException;
import com.innovationPassport.matrix.service.UserBO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("api/user")
public class UserController {

    @Autowired
    private UserBO userBO;


    @GetMapping(value = "/getUser/{id}")
    public UserDTO getUser(@PathVariable Integer id) throws ValidationException {
        log.debug("*** getUser() id: " + id);
        return userBO.getUser(id);
    }
}
