package com.cjmad.capstone.controllers;

import com.cjmad.capstone.models.Event;
import com.cjmad.capstone.models.User;
import com.cjmad.capstone.repositories.EventsRepository;
import com.cjmad.capstone.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
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
        return eventsRepository.findAllPublic();
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    public Event createEvent(@RequestBody Event event) {
        User user = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        event.setCreator(user);
        event.setAttendees(List.of(user));
        return eventsRepository.save(event);
    }

    @GetMapping("/{id}")
    public Optional<Event> getEventById(@PathVariable long id) {
        return eventsRepository.findById(id);
    }

    @PostMapping("/{id}/attend")
    @PreAuthorize("hasRole('ROLE_USER')")
    public Event attendEvent(@PathVariable long id) throws Exception {
        User user = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        Event event = eventsRepository.findById(id).orElseThrow();
        List<User> attendees = event.getAttendees();
        if(attendees.contains(user))
            throw new Exception("You are already attending this event");
        event.getAttendees().add(user);
        return eventsRepository.save(event);
    }
    @PostMapping("/{id}/leave")
    @PreAuthorize("hasRole('ROLE_USER')")
    public Event leaveEvent(@PathVariable long id) throws Exception {
        User user = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        Event event = eventsRepository.findById(id).orElseThrow();
        List<User> attendees = event.getAttendees();
        if(!attendees.contains(user))
            throw new Exception("You are not attending this event");

        event.getAttendees().remove(user);
        return eventsRepository.save(event);
    }

    @PutMapping("/events/edit/{id}")
    public ResponseEntity updateEvent(@PathVariable long id, @RequestBody Event event) {
        Event currentEvent =
                eventsRepository.findByCreator(id);
        currentEvent.setDate(event.getDate());
        currentEvent.setDescription(event.getDescription());
        currentEvent.setName(event.getName());

        return ResponseEntity.ok(currentEvent);
    }

    @DeleteMapping("/events/{id}")
    public ResponseEntity deleteEvent(@PathVariable long id) {
        eventsRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
