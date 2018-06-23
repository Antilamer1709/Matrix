package com.innovationPassport.matrix.controller;

import com.innovationPassport.matrix.dto.TopicDTO;
import com.innovationPassport.matrix.exception.ValidationException;
import com.innovationPassport.matrix.service.TopicBO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/topic")
public class TopicController {

    @Autowired
    private TopicBO topicBO;


    @GetMapping(value = "/getAllTopics")
    public List<TopicDTO> getAllTopics() {
        return topicBO.getAllTopics();
    }

    @GetMapping(value = "/getTopic/{id}")
    public TopicDTO getTopic(@PathVariable Integer id) throws ValidationException {
        return topicBO.getTopic(id);
    }

    @Secured({"ROLE_ADMIN", "ROLE_SUPER_ADMIN"})
    @PostMapping(value = "/create")
    @ResponseStatus(value = HttpStatus.OK)
    public void create(@RequestBody TopicDTO topicDTO) {
        topicBO.create(topicDTO);
    }

}
