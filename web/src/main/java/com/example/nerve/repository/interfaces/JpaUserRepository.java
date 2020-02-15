package com.example.nerve.repository.interfaces;

import com.example.nerve.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaUserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    void deleteByUsername(String username);
}
