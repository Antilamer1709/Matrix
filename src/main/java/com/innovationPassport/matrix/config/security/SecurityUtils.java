package com.innovationPassport.matrix.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.innovationPassport.matrix.dto.response.Response;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

final class SecurityUtils {

    private static final ObjectMapper mapper = new ObjectMapper();

    static void sendResponse(HttpServletResponse response, int status, Object object) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter writer = response.getWriter();
        writer.write(mapper.writeValueAsString(object));
        response.setStatus(status);
        writer.flush();
        writer.close();
    }

    static void sendError(HttpServletResponse response, Exception exception, int status, String message) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(status);
        PrintWriter writer = response.getWriter();
        writer.write(mapper.writeValueAsString(new Response(status, message, exception)));
        writer.flush();
        writer.close();
    }

}
