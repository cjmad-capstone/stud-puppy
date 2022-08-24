package com.cjmad.capstone.controllers;

import com.cjmad.capstone.models.Dog;
import com.cjmad.capstone.models.User;
import com.cjmad.capstone.repositories.DogRepository;
import com.cjmad.capstone.repositories.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/dogs")
@CrossOrigin(origins = "http://localhost:5173")
public class DogController {
    private final DogRepository dogsRepository;

    private final UserRepository userRepository;

    public DogController(DogRepository dogsRepository, UserRepository userRepository) {
        this.dogsRepository = dogsRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Dog> getDogs() {
        return dogsRepository.findAll();
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
}
