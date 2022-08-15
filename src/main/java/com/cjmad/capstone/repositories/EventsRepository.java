package com.cjmad.capstone.repositories;

import com.cjmad.capstone.models.Events;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventsRepository extends JpaRepository<Events, Long> {
    Events findByName(String name);
    Events findByOwner_name(String owner_name);
}

