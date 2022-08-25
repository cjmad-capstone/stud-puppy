package com.cjmad.capstone;

import com.cjmad.capstone.models.Role;
import com.cjmad.capstone.repositories.RoleRepository;
import com.cjmad.capstone.util.ROLES;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class CapstoneApplication implements CommandLineRunner {
    private final RoleRepository roleRepository;

    public CapstoneApplication(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(CapstoneApplication.class, args);
    }


    @Override
    public void run(String... args) throws Exception {
        if (roleRepository.findAll().isEmpty()) {
            roleRepository.save(new Role(ROLES.ROLE_ADMIN.toString()));
            roleRepository.save(new Role(ROLES.ROLE_USER.toString()));
        }
    }
}
