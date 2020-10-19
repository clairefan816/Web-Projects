package com.mavendemo.mavendemo;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TopicController {

    @RequestMapping("/topics")
    public List<Topic> getAllTopics(){
        return Arrays.asList(
            new Topic("spring", "Spring Framework", "Description for Spring"), 
            new Topic("summer", "Summer Framework", "Description for Summer"),
            new Topic("autumn", "Autumn Framework", "Description for Autumn"),
            new Topic("winter", "Winter Framework", "Description for Winter")
        );
    }
}
