package com.cjmad.capstone.repositories;

import com.cjmad.capstone.models.Event;
import com.cjmad.capstone.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EventsRepository extends JpaRepository<Event, Long> {

    @Query("SELECT e FROM Event e WHERE e.isPrivate = false")
    List<Event> findAllPublic();
    Event findByName(String name);

    Event findByCreator(long creator);

    List<Event> getEventsByAttendeesContains(User user);
}

