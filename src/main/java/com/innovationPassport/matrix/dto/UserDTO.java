package com.innovationPassport.matrix.dto;

import com.innovationPassport.matrix.model.UserEntity;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class UserDTO {

    private Integer id;

    private String username;

    private String firstName;

    private String lastName;

    private String password;

    private List<String> roles;


    public UserDTO() {
    }

    public UserDTO(UserEntity userEntity) {
        this.id = userEntity.getId();
        this.username = userEntity.getUsername();
        this.firstName = userEntity.getFirstName();
        this.lastName = userEntity.getLastName();
        this.roles = new ArrayList<>();
    }
}
