package com.cjmad.capstone.controllers;

import com.cjmad.capstone.models.Dog;
import com.cjmad.capstone.models.Event;
import com.cjmad.capstone.models.User;
import com.cjmad.capstone.repositories.EventsRepository;
import com.cjmad.capstone.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository userRepository;

    private final EventsRepository eventsRepository;

    private final PasswordEncoder passwordEncoder;


    public UserController(UserRepository userRepository, EventsRepository eventsRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.eventsRepository = eventsRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @GetMapping("/{id}")
    public Optional<User> getUser(@PathVariable long id) {
        return userRepository.findById(id);
    }

    @GetMapping("/{id}/dogs")
    public List<Dog> getUsersDogs(@PathVariable long id) {
        return userRepository.findById(id).orElseThrow().getDogs();
    }

    @GetMapping("/{id}/events")
    public List<Event> getUsersEvents(@PathVariable long id) {
        return eventsRepository.getEventsByAttendeesContains(userRepository.findById(id).orElseThrow());
    }

    @GetMapping("/me")
    public User getCurrentUser() {
        return userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
    }

    //Upload user profile pic
    @PutMapping("/me/profilePic/{handle}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public User setProfilePic(@PathVariable String handle){
        User user = getCurrentUser();
        user.setImg(handle);
        return userRepository.save(user);
    }

//    @PutMapping("/edit")
//    @PreAuthorize("hasRole('ROLE_USER')")
//    public ResponseEntity updateUser(@PathVariable Long id, @RequestBody User user) {
//        User authUser = getCurrentUser();
//        authUser.setName(user.getName());
//        authUser.setAddress(user.getAddress());
//        authUser.setEmail(user.getEmail());
//        return ResponseEntity.ok(getCurrentUser());
//    }

    @DeleteMapping("/delete")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity deleteUser() {
        User user = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        userRepository.deleteById(user.getId());
        return ResponseEntity.ok().build();
    }

}
