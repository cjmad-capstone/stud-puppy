package com.cjmad.capstone.models;


import javax.persistence.*;

@Entity
@Table(name = "blocked_list")
public class Blocked {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne
    @JoinColumn(name = "dog_id")
    private Dogs dogs;

    public Blocked() {}

    public Blocked(long id, User user, Dogs dogs) {
        this.id = id;
        this.user = user;
        this.dogs = dogs;
    }

    public Blocked(User user, Dogs dogs) {
        this.user = user;
        this.dogs = dogs;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Dogs getDogs() {
        return dogs;
    }

    public void setDogs(Dogs dogs) {
        this.dogs = dogs;
    }
}
