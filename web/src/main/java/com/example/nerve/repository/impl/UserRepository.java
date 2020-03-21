package com.example.nerve.repository.impl;

import com.example.nerve.model.entity.User;
import com.example.nerve.repository.jpa.JpaUserRepository;
import com.example.nerve.repository.interfaces.iUserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserRepository implements iUserRepository {
    private final JpaUserRepository repo;

    public UserRepository(JpaUserRepository repo) {
        this.repo = repo;
    }

    @Override
    public long usersLength() {
        return repo.totalUserCount();
    }

    @Override
    public User save(User user) {
        return repo.save(user);
    }

    @Override
    public List<User> saveAll(List<User> users) {
        return repo.saveAll(users);
    }

    @Override
    public List<User> findAll() {
        return repo.findAll();
    }

    @Override
    public Page<User> findPageable(Pageable pageable) {
        return repo.findAll(pageable);
    }

    @Override
    public List<User> searchByUsername(String username) {
        return repo.searchByUsername(username);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return repo.findByUsername(username);
    }

    @Override
    public Optional<User> findById(Long id) {
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

    @Override
    public void deleteAll(List<User> users) {
        repo.deleteAll(users);
    }

}
