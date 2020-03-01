package com.example.nerve.service.interfaces;

import com.example.nerve.model.entity.Streak;

import java.util.List;

public interface iStreakService {
    Streak setStreak(Long id1, Long id2);

    List<Streak> getForUsername(String username);

    List<Streak> getForUserId(Long id);
}
