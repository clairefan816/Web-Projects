package com.mavendemo.mavendemo;

public class Topic {
    
    private String id;
    private String name;
    private String description;

    public Topic(){

    }

    public Topic(String id, String name, String description){
        this.id = id;
        this.name= name;
        this.description = description;
    }

    public String getID(){
        return id;
    }

    public String getName(){
        return name;
    }

    public String getDescription(){
        return description;
    }

    public void setID(String id){
        this.id = id;
    }

    public void setName(String name){
        this.name = name;
    }

    public void setDescription(String description){
        this.description = description;
    }
}
