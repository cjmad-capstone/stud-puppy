package com.cjmad.capstone.repositories;

import com.cjmad.capstone.domain.Todo;
import org.springframework.data.repository.CrudRepository;

public interface TodoRepository extends CrudRepository<Todo, Long> {
    Todo findByTitle(String title);
}



