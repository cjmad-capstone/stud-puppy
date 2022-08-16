package com.cjmad.capstone.models;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "dog_breed")
@AllArgsConstructor
@Getter
@Setter
public class DogBreed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "breed_name", nullable = false)
    private String breedName;

    @OneToOne
    @JoinColumn(name = "dog_id")
    private Dog dogs;


    public DogBreed() {
    }

}
