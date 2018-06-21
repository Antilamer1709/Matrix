package com.innovationPassport.matrix.controller;

import com.innovationPassport.matrix.dto.TopicDTO;
import com.innovationPassport.matrix.service.TopicBO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
