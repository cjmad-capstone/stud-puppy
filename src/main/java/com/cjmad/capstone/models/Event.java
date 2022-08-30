package com.cjmad.capstone.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "events")
@AllArgsConstructor
@Getter
@Setter
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "date")
    private Date date;

    @Column(name = "time")
    private String time;

    @ManyToOne
    @JoinColumn(name = "creator_id")
    private User creator;

    public Event() {
    }


}
