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

    @OneToMany
            @JoinColumn(name = "users_id")
    private long users_id;

    public Events(){}

    public Events(String event_description, Integer date, Integer time) {
        this.event_description = event_description;
        this.date = date;
        this.time = time;
    }

    public Events(long id, String event_description, Integer date, Integer time, long users_id) {
        this.id = id;
        this.event_description = event_description;
        this.date = date;
        this.time = time;
        this.users_id = users_id;
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

    public long getUsers_id() {
        return users_id;
    }

    public void setUsers_id(long users_id) {
        this.users_id = users_id;
    }
}
