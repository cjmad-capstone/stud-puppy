package com.cjmad.capstone.controllers;

import com.cjmad.capstone.models.Events;
import com.cjmad.capstone.models.User;
import com.cjmad.capstone.repositories.EventsRepository;
import com.cjmad.capstone.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventsRepository eventsRepository;
    private final UserRepository userRepository;

    public EventController(EventsRepository eventsRepository, UserRepository userRepository){
        this.eventsRepository = eventsRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Events> getUsers() {
        return eventsRepository.findAll();
    }

    @PostMapping
    public Events createEvent(@RequestBody Events event){
        return eventsRepository.save(event);
    }

    @GetMapping("/event-{id}")
    public Events getEvent(@PathVariable long id) {
        return eventsRepository.getReferenceById(id);
    }
}
