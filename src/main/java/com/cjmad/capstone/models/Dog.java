package com.cjmad.capstone.models;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

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

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name="dogs_breeds",
            joinColumns={@JoinColumn(name="dog_id")},
            inverseJoinColumns={@JoinColumn(name="breed_id")}
    )
    private List<DogBreed> breeds;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String sex;

    @Column(nullable = false)
    private Date dob;

    @Column(nullable = false)
    private double weight;

    @Column(nullable = false)
    @OneToMany(mappedBy = "dog", orphanRemoval = true, cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<DogImage> images;

    @Column(nullable = false)
    private Boolean loveable;
    //'submissive and breedable"//

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User owner;

    public Dog() {
    }
}

