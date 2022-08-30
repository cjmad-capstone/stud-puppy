package com.cjmad.capstone.controllers;

import com.cjmad.capstone.models.Event;
import com.cjmad.capstone.models.User;
import com.cjmad.capstone.repositories.EventsRepository;
import com.cjmad.capstone.repositories.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventsRepository eventsRepository;
    private final UserRepository userRepository;

    public EventController(EventsRepository eventsRepository, UserRepository userRepository) {
        this.eventsRepository = eventsRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Event> getEvent() {
        return eventsRepository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    public Event createEvent(@RequestBody Event event) {
        User user = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        event.setCreator(user);
        return eventsRepository.save(event);
    }

    @GetMapping("/{id}")
    public Optional<Event> getEventById(@PathVariable long id) {
        return eventsRepository.findById(id);
    }
}
