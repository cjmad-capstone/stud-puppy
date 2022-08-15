package com.cjmad.capstone.models;


import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import javax.persistence.*;

@Entity
@Table(name = "dogbreed")
public class DogBreed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

@OneToOne
    @JoinColumn(name = "dog_id")
    private Dogs dogs;

@OneToOne
    @JoinColumn(name = "breed_id")
    private DogBreed dogBreed;

public DogBreed() {}

    public DogBreed(long id, Dogs dogs, DogBreed dogBreed) {
        this.id = id;
        this.dogs = dogs;
        this.dogBreed = dogBreed;
    }

    public DogBreed(Dogs dogs, DogBreed dogBreed) {
        this.dogs = dogs;
        this.dogBreed = dogBreed;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Dogs getDogs() {
        return dogs;
    }

    public void setDogs(Dogs dogs) {
        this.dogs = dogs;
    }

    public DogBreed getDogBreed() {
        return dogBreed;
    }

    public void setDogBreed(DogBreed dogBreed) {
        this.dogBreed = dogBreed;
    }
}
