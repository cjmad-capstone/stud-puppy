package com.cjmad.capstone.repositories;

import com.cjmad.capstone.models.Dogs;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DogRepository extends JpaRepository<Dogs, Long> {
    Dogs findByName(String name);
    Dogs findByOwner_name(String owner_name);
}

