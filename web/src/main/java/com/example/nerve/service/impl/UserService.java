package com.example.nerve.service.impl;

import com.example.nerve.model.User;
import com.example.nerve.repository.interfaces.iUserRepository;
import com.example.nerve.service.interfaces.iUserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements iUserService {
    private final BCryptPasswordEncoder encoder;
    private final iUserRepository repo;

    public UserService(BCryptPasswordEncoder encoder, iUserRepository repo) {
        this.encoder = encoder;
        this.repo = repo;
    }

    @Override
    public User createUser(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);
    }

    @Override
    public User getByUsername(String username) {
        return repo.findByUsername(username);
    }

    @Override
    public void deleteByUsername(String username) {
        repo.deleteByUsername(username);
    }
}
