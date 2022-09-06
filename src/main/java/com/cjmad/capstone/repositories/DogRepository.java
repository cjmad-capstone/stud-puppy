package com.cjmad.capstone.repositories;

import com.cjmad.capstone.models.Dog;
import com.cjmad.capstone.models.DogBreed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface DogRepository extends JpaRepository<Dog, Long> {

    Set<Dog> findAllByZipCode(Long zipCode);

    @Query("SELECT d FROM Dog d JOIN d.breeds b WHERE d.zipCode = ?1 AND b.breedName = ?2")
    Set<Dog> findAllByZipCodeAndHasBreed(Long zipCode, String breed);
    Dog findByName(String name);
}

