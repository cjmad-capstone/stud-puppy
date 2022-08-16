package com.cjmad.capstone.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "rating")
@AllArgsConstructor
@Getter
@Setter
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "rating", nullable = false)
    private Integer rating;

    @OneToOne
    @JoinColumn(name = "dog_id")
    private Dog dogs;

    @OneToOne
    @JoinColumn(name = "users_id")
    private User user;

    public Rating() {
    }
}