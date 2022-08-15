package com.cjmad.capstone.models;


import javax.persistence.*;

@Entity
@Table(name = "dogs")
public class Dogs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "dog_name", nullable = false)
    private String dog_name;

    @Column(name = "breed_id",nullable = false)
    private String breed_id;

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

    @OneToMany
            @JoinColumn(name = "user_id")
    private User user;

    public Dogs() {}

    public Dogs(long id, String dog_name, String breed_id, String dog_description, String dog_sex, Integer dob, Integer weight, String dog_img, Boolean loveable) {
        this.id = id;
        this.dog_name = dog_name;
        this.breed_id = breed_id;
        this.dog_description = dog_description;
        this.dog_sex = dog_sex;
        this.dob = dob;
        this.weight = weight;
        this.dog_img = dog_img;
        this.loveable = loveable;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDog_name() {
        return dog_name;
    }

    public void setDog_name(String dog_name) {
        this.dog_name = dog_name;
    }

    public String getBreed_id() {
        return breed_id;
    }

    public void setBreed_id(String breed_id) {
        this.breed_id = breed_id;
    }

    public String getDog_description() {
        return dog_description;
    }

    public void setDog_description(String dog_description) {
        this.dog_description = dog_description;
    }

    public String getDog_sex() {
        return dog_sex;
    }

    public void setDog_sex(String dog_sex) {
        this.dog_sex = dog_sex;
    }

    public Integer getDob() {
        return dob;
    }

    public void setDob(Integer dob) {
        this.dob = dob;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public String getDog_img() {
        return dog_img;
    }

    public void setDog_img(String dog_img) {
        this.dog_img = dog_img;
    }

    public Boolean getLoveable() {
        return loveable;
    }

    public void setLoveable(Boolean loveable) {
        this.loveable = loveable;
    }
}

