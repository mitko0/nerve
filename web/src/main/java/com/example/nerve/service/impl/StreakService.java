package com.example.nerve.service.impl;

import com.example.nerve.model.composite_key.StreakKey;
import com.example.nerve.model.entity.Streak;
import com.example.nerve.model.entity.User;
import com.example.nerve.repository.interfaces.iStreakRepository;
import com.example.nerve.repository.interfaces.iUserRepository;
import com.example.nerve.service.interfaces.iStreakService;
import org.joda.time.DateTime;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StreakService implements iStreakService {

    private final iStreakRepository repo;
    private final iUserRepository userRepo;

    public StreakService(iStreakRepository repo, iUserRepository userRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
    }

    @Override
    public Streak setStreak(Long id1, Long id2) {
        Long tmp = id1;
        id1 = Math.min(id1, id2);
        id2 = Math.max(tmp, id2);

        User user1 = userRepo.findById(id1).orElseThrow(() -> new RuntimeException("m:: User not found!"));
        User user2 = userRepo.findById(id2).orElseThrow(() -> new RuntimeException("m:: User not found!"));

        StreakKey streakKey = new StreakKey(id1, id2);
        DateTime now = new DateTime();
        //db time bug
        now = now.plusHours(1);

        Streak newStreak = new Streak(streakKey, user1, user2, 1, null, now.plusDays(1).toDate());
        //valid streaks only
        Streak streak = repo.findById(streakKey).orElse(newStreak);

        if (streak.getUpdateDate().after(now.toDate())) {
            int streakLen = streak.getStreak();
            streak.setUpdateDate(now.plusDays(1).toDate());
            streak.setStreak(streakLen + 1);
        }

        streak.setExpirationDate(now.toDate());
        return repo.save(streak);
    }

    @Override
    public List<Streak> getForUsername(String username) {
        return repo.findByUsername(username);
    }

    @Override
    public List<Streak> getForUserId(Long id) {
        return repo.findByUserId(id);
    }
}
