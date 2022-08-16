package com.cjmad.capstone.repositories;

import com.cjmad.capstone.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventsRepository extends JpaRepository<Event, Long> {
    Event findByName(String name);

    Event findByCreator(long creator);
}

