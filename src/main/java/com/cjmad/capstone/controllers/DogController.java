package com.cjmad.capstone.controllers;

import com.cjmad.capstone.models.User;
import com.cjmad.capstone.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dogs")
public class DogController {
    private final DogRepository dogRepository;
    private final PasswordEncoder passwordEncoder;

    public DogController(DogRepository dogRepository, PasswordEncoder passwordEncoder){
        this.dogRepository = dogRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public List<User> getDogs() {
        return dogRepository.findAll();
    }

    @PostMapping
    public Dog createDog(@RequestBody Dog dog) {
        dog.setPassword(passwordEncoder.encode(dog.getPassword()));
        return dogRepository.save(dog);
    }

    @GetMapping("/dog-{id}")
    public Dog getDog(@PathVariable long id) {
        return dogRepository.getReferenceById(id);
    }
}
