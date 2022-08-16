package com.cjmad.capstone.models;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "dogs")
@AllArgsConstructor
@Getter
@Setter
public class Dog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "dog_name", nullable = false)
    private String name;

    @OneToOne
    @JoinColumn(name = "breed_id")
    private DogBreed breed;

    @Column(nullable = false)
    private String dog_description;

    @Column(nullable = false)
    private String dog_sex;

    @Column(nullable = false)
    private Integer dob;

    @Column(nullable = false)
    private Integer weight;

    @Column(nullable = false)
    private String dog_img;

    @Column(nullable = false)
    private Boolean loveable;
    //'submissive and breedable"//

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User owner;

    public Dog() {
    }

}

