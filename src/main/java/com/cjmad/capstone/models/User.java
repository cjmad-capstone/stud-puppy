package com.cjmad.capstone.models;

import com.fasterxml.jackson.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@AllArgsConstructor
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "zipCode", nullable = false)
    private String zipCode;

    @Column(name = "img")
    private String img;

    @Column(name = "name")
    private String name;

    @Column(name = "password", nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @OneToMany(mappedBy = "owner")
    @JsonIgnore
    private List<Dog> dogs;


    @OneToMany(mappedBy = "creator")
    @JsonIgnore
    private List<Event> events;

    @ManyToOne
    private Role role;


    @ManyToMany
    @JoinTable(
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "event_id"))
    @JsonIgnore
    private List<Event> attendingEvents;

    public User() {
    }

    public User(User copy){
        this.id = copy.id;
        this.username = copy.username;
        this.email = copy.email;
        this.zipCode = copy.zipCode;
        this.img = copy.img;
        this.name = copy.name;
        this.password = copy.password;
        this.dogs = copy.dogs;
        this.events = copy.events;
        this.role = copy.role;
        this.attendingEvents = copy.attendingEvents;
    }

}
