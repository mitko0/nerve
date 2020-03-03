package com.example.nerve.service.interfaces;

import com.example.nerve.model.composite_key.StreakKey;
import com.example.nerve.model.entity.Streak;

import java.util.List;

public interface iStreakService {
    Streak setStreak(long id1, long id2);

    Streak getForId(StreakKey id);

    List<Streak> getForUsername(String username);

    List<Streak> getForUserId(Long id);

    void deleteExpired();
}
