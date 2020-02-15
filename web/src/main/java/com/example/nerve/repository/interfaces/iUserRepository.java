package com.example.nerve.repository.interfaces;

import com.example.nerve.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface iUserRepository {
    User save(User user);

    List<User> findAll();

    Page<User> findPageable(Pageable pageable);

    Optional<User> findByUsername(String username);

    Optional<User> findById(Long id);

    void deleteByUsername(String username);

    void deleteById(Long id);

    void deleteAll();
}
