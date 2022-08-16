package com.cjmad.capstone.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
@AllArgsConstructor
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "img", nullable = false)
    private String img;

    @Column(name = "name", nullable = false)
    private String name;

    @Transient
    @Column(name = "password", nullable = false)
    private String password;

    @OneToMany
    private List<Dog> dogs;

    @OneToMany
    private List<Event> events;


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

}
