package com.cjmad.capstone.models;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
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

    @Column(name = "owner_img", nullable = false)
    private String owner_img;

    @Column(name = "owner_name", nullable = false)
    private  String owner_name;

    @Transient
    @Column(name = "password", nullable = false)
    private String password;

    @OneToMany
    @JoinColumn(name = "dog_id")
    private List<Dogs> dogs;


    public User() {
    }

    public User(Long id, String username, String address, String owner_name, String email, String password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.address = address;
        this.owner_img = owner_img;
        this.owner_name = owner_name;
    }

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public User(User copy){
        this.id = copy.id;
        this.username = copy.username;
        this.email = copy.email;
        this.password = copy.password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getOwner_img() {
        return owner_img;
    }

    public void setOwner_img(String owner_img) {
        this.owner_img = owner_img;
    }

    public String getOwner_name() {
        return owner_name;
    }

    public void setOwner_name(String owner_name) {
        this.owner_name = owner_name;
    }

    public List<Dogs> getDogs() {
        return dogs;
    }

    public void setDogs(List<Dogs> dogs) {
        this.dogs = dogs;
    }

}
