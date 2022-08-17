package com.cjmad.capstone.models;

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

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "img")
    private String img;

    @Column(name = "name")
    private String name;

    @org.springframework.data.annotation.Transient
    @Column(name = "password", nullable = false)
    private String password;

    @OneToMany
    private List<Dog> dogs;

    @OneToMany
    private List<Event> events;

    @ManyToOne
    private Role role;


    public User() {
    }

    public User(User copy) {
        this.id = copy.id;
        this.username = copy.username;
        this.email = copy.email;
        this.address = copy.address;
        this.img = copy.img;
        this.name = copy.name;
        this.password = copy.password;
        this.dogs = copy.dogs;
    }

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

}
