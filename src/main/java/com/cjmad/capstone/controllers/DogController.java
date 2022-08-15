package com.cjmad.capstone.controllers;

import com.cjmad.capstone.models.Dogs;
import com.cjmad.capstone.models.User;
import com.cjmad.capstone.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dogs")
public class DogController {
    private final DogsRepository dogsRepository;
    private final PasswordEncoder passwordEncoder;

    public DogController(DogsRepository dogsRepository, PasswordEncoder passwordEncoder){
        this.dogsRepository = dogsRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public List<Dogs> getDogs() {
        return dogsRepository.findAll();
    }

    @PostMapping
    public Dogs createDog(@RequestBody Dogs dog) {
        return dogsRepository.save(dog);
    }

    @GetMapping("/dog-{id}")
    public Dogs getDogs(@PathVariable long id) {
        return dogsRepository.getReferenceById(id);
    }
}
