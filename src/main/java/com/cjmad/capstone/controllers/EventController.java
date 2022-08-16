package com.cjmad.capstone.controllers;

import com.cjmad.capstone.models.Event;
import com.cjmad.capstone.repositories.EventsRepository;
import com.cjmad.capstone.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventsRepository eventsRepository;

    public EventController(EventsRepository eventsRepository, UserRepository userRepository) {
        this.eventsRepository = eventsRepository;
    }

    @GetMapping
    public List<Event> getEvent() {
        return eventsRepository.findAll();
    }

    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return eventsRepository.save(event);
    }

    @GetMapping("/{id}")
    public Event getEventById(@PathVariable long id) {
        return eventsRepository.getReferenceById(id);
    }
}
