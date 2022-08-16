package com.cjmad.capstone.repositories;

import com.cjmad.capstone.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    @Query("FROM Role WHERE name=:name")
    Role findByName(String name);
}
