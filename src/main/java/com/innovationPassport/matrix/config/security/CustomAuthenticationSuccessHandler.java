package com.innovationPassport.matrix.config.security;

import com.innovationPassport.matrix.dto.UserDTO;
import com.innovationPassport.matrix.model.UserEntity;
import com.innovationPassport.matrix.service.AuthenticationBO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private AuthenticationBO authenticationBO;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws ServletException, IOException {
        UserEntity user = authenticationBO.getLoggedUser();
        SecurityUtils.sendResponse(response, HttpServletResponse.SC_OK, new UserDTO(user));
    }
}