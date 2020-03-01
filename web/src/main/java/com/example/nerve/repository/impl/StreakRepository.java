package com.example.nerve.repository.impl;

import com.example.nerve.model.composite_key.StreakKey;
import com.example.nerve.model.entity.Streak;
import com.example.nerve.repository.interfaces.iStreakRepository;
import com.example.nerve.repository.jpa.JpaStreakRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class StreakRepository implements iStreakRepository {
    private final JpaStreakRepository repo;

    public StreakRepository(JpaStreakRepository repo) {
        this.repo = repo;
    }

    @Override
    public Streak save(Streak streak) {
        return repo.save(streak);
    }

    @Override
    public Optional<Streak> findById(StreakKey key) {
        return repo.findByIdValid(key);
    }

    @Override
    public List<Streak> findByUsername(String username) {
        return repo.findByUsername(username);
    }

    @Override
    public List<Streak> findByUserId(Long id) {
        return repo.findByUserId(id);
    }

    @Override
    public void deleteExpired() {
        repo.deleteExpired();
    }
}
