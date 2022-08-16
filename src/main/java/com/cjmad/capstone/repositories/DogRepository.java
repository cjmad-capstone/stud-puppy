package com.cjmad.capstone.repositories;

import com.cjmad.capstone.models.Dog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DogRepository extends JpaRepository<Dog, Long> {
    Dog findByName(String name);
}

