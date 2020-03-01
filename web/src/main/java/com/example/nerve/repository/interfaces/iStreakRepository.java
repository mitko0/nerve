package com.example.nerve.repository.interfaces;

import com.example.nerve.model.composite_key.StreakKey;
import com.example.nerve.model.entity.Streak;

import java.util.List;
import java.util.Optional;

public interface iStreakRepository {

    Streak save(Streak streak);

    Optional<Streak> findById(StreakKey key);

    List<Streak> findByUsername(String username);

    List<Streak> findByUserId(Long id);

    void deleteExpired();
}
