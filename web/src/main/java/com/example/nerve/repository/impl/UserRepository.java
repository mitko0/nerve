package com.example.nerve.repository.impl;

import com.example.nerve.model.User;
import com.example.nerve.repository.interfaces.JpaUserRepository;
import com.example.nerve.repository.interfaces.iUserRepository;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository implements iUserRepository {
    private final JpaUserRepository repo;

    public UserRepository(JpaUserRepository repo) {
        this.repo = repo;
    }

    @Override
    public User save(User user) {
        return repo.save(user);
    }

    @Override
    public User findByUsername(String username) {
        return repo.findByUsername(username);
    }

    @Override
    public void deleteByUsername(String username) {
        repo.deleteByUsername(username);
    }
}
