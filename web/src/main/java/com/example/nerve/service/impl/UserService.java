package com.example.nerve.service.impl;

import com.example.nerve.model.User;
import com.example.nerve.repository.interfaces.iUserRepository;
import com.example.nerve.service.interfaces.iUserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    public User updateUserById(Long id, Optional<String> username, Optional<String> email, Optional<String> password) {
        Optional<User> opt = repo.findById(id);
        opt.orElseThrow(RuntimeException::new);
        User user = opt.get();

        String name = username.orElse(user.getUsername());
        String pwd = password.orElse(user.getPassword());
        String mail = email.orElse(user.getEmail());

        user.setUsername(name);
        user.setEmail(mail);
        user.setPassword(encoder.encode(pwd));
        return repo.save(user);
    }

    @Override
    public User updateUserByUsername(String username, Optional<String> newUsername, Optional<String> email, Optional<String> password) {
        Optional<User> opt = repo.findByUsername(username);
        opt.orElseThrow(RuntimeException::new);
        User user = opt.get();

        String name = newUsername.orElse(user.getUsername());
        String pwd = password.orElse(user.getPassword());
        String mail = email.orElse(user.getEmail());

        user.setUsername(name);
        user.setEmail(mail);
        user.setPassword(encoder.encode(pwd));
        return repo.save(user);
    }

    @Override
    public User updateUser(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);
    }

    @Override
    public List<User> all() {
        return repo.findAll();
    }

    @Override
    public Page<User> usersPaged(Pageable pageable) {
        return repo.findPageable(pageable);
    }

    @Override
    public Optional<User> getByUsername(String username) {
        return repo.findByUsername(username);
    }

    @Override
    public Optional<User> getById(Long id) {
        return repo.findById(id);
    }

    @Override
    public void deleteByUsername(String username) {
        repo.deleteByUsername(username);
    }

    @Override
    public void deleteById(Long id) {
        repo.deleteById(id);
    }
}
