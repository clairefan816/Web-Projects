package com.topicinfo.info.topic;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TopicController {

    @Autowired //inject
    private TopicService topicService;

    @RequestMapping("/topics")
    public List<Topic> getAllTopics(){
        return topicService.getAllTopics();
    }

    //request one specific object with id
    @RequestMapping("/topics/{id}")
    // pass the request id to the method
    public Topic getTopic(@PathVariable String id){
        return topicService.getOneTopic(id);
    }

    //post request for adding an object
    //the post request happens in url topics
    @RequestMapping(method=RequestMethod.POST, value = "/topics")
    // the request contain a JSON respresentation of topic instance
    // need to be converted into Topic object
    public void addTopic(@RequestBody Topic topic){
        topicService.addOneTopic(topic);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/topics/{id}")
    public void updateTopic(@RequestBody Topic topic, @PathVariable String id){
        topicService.updateOneTopic(topic, id);
    }

    @RequestMapping(method = RequestMethod.DELETE, value="/topics/{id}")
    public void deleteTopic(@PathVariable String id){
        topicService.deleteOneTopic(id);
    }
}
