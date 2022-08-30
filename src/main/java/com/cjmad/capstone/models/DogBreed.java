package com.cjmad.capstone.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "breeds")
@AllArgsConstructor
@Getter
@Setter
public class DogBreed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "breed_name", nullable = false)
    private String breedName;

    @JsonBackReference
    @ManyToMany(mappedBy = "breeds")
    private List<Dog> dogs;


    public DogBreed() {
    }

    public DogBreed(String breedName) {
        this.breedName = breedName;
    }

}
