package com.cjmad.capstone.models;

import javax.persistence.*;

@Entity
@Table(name = "rating")
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "rating", nullable = false)
    private Integer rating;

    @OneToOne
    @JoinColumn(name = "dog_id")
    private Dogs dogs;

    @OneToOne
    @JoinColumn(name = "users_id")
    private User user;

    public Rating() {
    }

    public Rating(Integer rating, Dogs dogs, User user) {
        this.rating = rating;
        this.dogs = dogs;
        this.user = user;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Dogs getDogs() {
        return dogs;
    }

    public void setDogs(Dogs dogs) {
        this.dogs = dogs;
    }

    public User getUsers() {
        return user;
    }

    public void setUsers(User user) {
        this.user = user;
    }
}