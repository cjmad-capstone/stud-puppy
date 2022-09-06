package com.cjmad.capstone.controllers;

import com.cjmad.capstone.models.*;
import com.cjmad.capstone.repositories.DogRepository;
import com.cjmad.capstone.repositories.EventsRepository;
import com.cjmad.capstone.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/dogs")
//@CrossOrigin(origins = "http://localhost:5173")
public class DogController {
    private final DogRepository dogsRepository;

    private final UserRepository userRepository;

    private final EventsRepository eventsRepository;

    public DogController(DogRepository dogsRepository, UserRepository userRepository, EventsRepository eventsRepository) {
        this.dogsRepository = dogsRepository;
        this.userRepository = userRepository;
        this.eventsRepository = eventsRepository;
    }

    @GetMapping
    public Collection<Dog> getDogs(@RequestParam(required = false) Long zipCode, @RequestParam(required = false) String breed) {
        if(zipCode != null && breed != null) {
            return dogsRepository.findAllByZipCodeAndHasBreed(zipCode, breed);
        } else if(zipCode != null) {
            return dogsRepository.findAllByZipCode(zipCode);
        } else {
            return dogsRepository.findAll();
        }
    }


    @PostMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    public Dog createDog(@RequestBody Dog dog) {
        User user = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        dog.setOwner(user);
        return dogsRepository.save(dog);
    }

    @GetMapping("/{id}")
    public Optional<Dog> getDogs(@PathVariable long id) {
        return dogsRepository.findById(id);
    }

    @PostMapping("/link")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Object> linkDog(@RequestBody Link link) {
        User user = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        Dog userDog = dogsRepository.findById(link.getUserDogId()).orElseThrow();
        Dog dogToLink = dogsRepository.findById(link.getDogToLinkId()).orElseThrow();
        if (userDog.getOwner().getId() != user.getId()) {
            return ResponseEntity.badRequest().body("You do not own this dog");
        }

        Event event = new Event();
        event.setCreator(userDog.getOwner());
        event.setAttendees(List.of(userDog.getOwner(), dogToLink.getOwner()));
        event.setDate(link.getDate());
        event.setName("Meetup with " + dogToLink.getName() + " and " + userDog.getName());
        event.setDescription("Meetup with " + dogToLink.getName() + " and " + userDog.getName());
        event.setPrivate(true);
        eventsRepository.save(event);
        return ResponseEntity.ok(event);
    }

    @PutMapping("/{id}/edit")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity updateDog(@PathVariable long id, @RequestBody Dog dog) {
        User user = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        Dog currentDog = dogsRepository.findById(id).orElseThrow(RuntimeException:: new);

        if (!user.getDogs().contains(currentDog)) return ResponseEntity.badRequest().build();

        currentDog.setName(dog.getName());
        currentDog.setDescription(dog.getDescription());
        currentDog.setDob(dog.getDob());
        currentDog.setSex(dog.getSex());
        currentDog.setWeight(dog.getWeight());
        currentDog.setLoveable(dog.getLoveable());

        if(dog.getImages() != null && dog.getImages().size() > 0)
            currentDog.setImages(dog.getImages());

        dogsRepository.save(currentDog);

        return ResponseEntity.ok(currentDog);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity deleteDog(@PathVariable long id) {
        User user = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        Dog dog = dogsRepository.findById(id).orElseThrow();
        if (!user.getDogs().contains(dog)) return ResponseEntity.badRequest().build();

        dogsRepository.deleteById(id);
        return ResponseEntity.ok(dog);
    }

}
