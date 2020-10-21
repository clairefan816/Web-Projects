package com.topicinfo.info.topic;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TopicService {

    @Autowired
    private TopicRepository topicRepository;

    // here need a mutable array
    // Arrays.asList is immutable
    // private List<Topic> topics = new ArrayList<>(Arrays.asList(
    //     new Topic("spring", "Spring Framework", "Description for Spring"), 
    //     new Topic("summer", "Summer Framework", "Description for Summer"),
    //     new Topic("autumn", "Autumn Framework", "Description for Autumn"),
    //     new Topic("winter", "Winter Framework", "Description for Winter")
    // ));


    public List<Topic> getAllTopics(){
        //return topics;
        List<Topic> topics = new ArrayList<>();
        topicRepository.findAll().forEach(topics::add);
        return topics;
    }

    public Topic getOneTopic(String id){
        //return topics.stream().filter(t -> t.getID().equals(id)).findFirst().get();
        Optional<Topic> optionalTopic = topicRepository.findById(id);
        Topic topic = optionalTopic.get();
        return topic;
    }

    public void addOneTopic(Topic topic){
        //topics.add(topic);
        topicRepository.save(topic);
    }

    public void updateOneTopic(Topic topic, String id){
        // for (int i = 0; i < topics.size(); i++){
        //     Topic t = topics.get(i);
        //     if (t.getID().equals(id)){
        //         topics.set(i, topic);
        //         return;
        //     }
        // }
        // topic has ID, the database know whether there exist a row
        topicRepository.save(topic);
    }

    public void deleteOneTopic(String id){
        //topics.removeIf(t -> t.getID().equals(id));
        topicRepository.deleteById(id);
    }
}
    
