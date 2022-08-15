package com.cjmad.capstone.controllers;

import com.cjmad.capstone.models.User;
import com.cjmad.capstone.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public EventController(EventRepository eventRepository, UserRepository userRepository){
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Event> getUsers() {
        return EventRepository.findAll();
    }

    @PostMapping
    public Event createEvent(@RequestBody Event event){
        return eventRepository.save(event);
    }

    @GetMapping("/event-{id}")
    public Event getEvent(@PathVariable long id) {
        return eventRepository.getReferenceById(id);
    }
}
