package com.cjmad.capstone.models;

import org.springframework.web.bind.annotation.GetMapping;

import javax.persistence.*;

@Entity
@Table(name = "events")
public class Events {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "event_description")
    private String event_description;

    @Column(name = "date")
    private Integer date;

    @Column(name = "time")
    private Integer time;

    @ManyToOne
            @JoinColumn(name = "users_id")
    private User user;

    public Events(){}

    public Events(String event_description, Integer date, Integer time) {
        this.event_description = event_description;
        this.date = date;
        this.time = time;
    }

    public Events(long id, String event_description, Integer date, Integer time, User user) {
        this.id = id;
        this.event_description = event_description;
        this.date = date;
        this.time = time;
        this.user = user;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEvent_description() {
        return event_description;
    }

    public void setEvent_description(String event_description) {
        this.event_description = event_description;
    }

    public Integer getDate() {
        return date;
    }

    public void setDate(Integer date) {
        this.date = date;
    }

    public Integer getTime() {
        return time;
    }

    public void setTime(Integer time) {
        this.time = time;
    }

    public  User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user= user;
    }
}
