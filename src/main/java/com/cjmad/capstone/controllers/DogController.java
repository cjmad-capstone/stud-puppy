package com.cjmad.capstone.controllers;

import com.cjmad.capstone.models.Dog;
import com.cjmad.capstone.repositories.DogRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dogs")
public class DogController {
    private final DogRepository dogsRepository;

    public DogController(DogRepository dogsRepository) {
        this.dogsRepository = dogsRepository;
    }

    @GetMapping
    public List<Dog> getDogs() {
        return dogsRepository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    public Dog createDog(@RequestBody Dog dog) {
        System.out.println(SecurityContextHolder.getContext().getAuthentication());
        return dogsRepository.save(dog);
    }

    @GetMapping("/{id}")
    public Dog getDogs(@PathVariable long id) {
        return dogsRepository.getReferenceById(id);
    }
}
