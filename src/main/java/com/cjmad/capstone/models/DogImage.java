package com.cjmad.capstone.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "dogs_images")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DogImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String url;

    @JoinColumn(nullable = false)
    @ManyToOne(cascade = CascadeType.ALL)
    @JsonBackReference
    private Dog dog;
}
