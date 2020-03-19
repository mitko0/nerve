package com.example.nerve.service.impl;

import com.example.nerve.model.composite_key.StreakKey;
import com.example.nerve.model.entity.Streak;
import com.example.nerve.model.entity.User;
import com.example.nerve.repository.interfaces.iStreakRepository;
import com.example.nerve.repository.interfaces.iUserRepository;
import com.example.nerve.service.interfaces.iStreakService;
import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
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
    public Streak setStreak(long id1, long id2) {
        long tmp = id1;
        id1 = Math.min(id1, id2);
        id2 = Math.max(tmp, id2);

        User user1 = userRepo.findById(id1).orElseThrow(() -> new RuntimeException("m:: User not found!"));
        User user2 = userRepo.findById(id2).orElseThrow(() -> new RuntimeException("m:: User not found!"));

        DateTime nowDt = new DateTime(DateTimeZone.UTC);

        StreakKey streakKey = new StreakKey(id1, id2);
        Streak newStreak = new Streak(streakKey, user1, user2, 1, null, nowDt.plusMinutes(10).toDate());
        Streak streak = repo.findValidById(streakKey).orElse(newStreak);

        if (streak.getUpdateDate().before(nowDt.toDate())) {
            int streakLen = streak.getStreak();
            streak.setUpdateDate(nowDt.plusMinutes(10).toDate());
            streak.setStreak(streakLen + 1);
        }

        streak.setExpirationDate(nowDt.plusMinutes(10).toDate());
        return repo.save(streak);
    }

    @Override
    public Streak getForId(StreakKey id) {
        long user1 = id.getUser1Id();
        long user2 = id.getUser2Id();
        long tmp = user1;

        user1 = Math.min(user1, user2);
        user2 = Math.max(tmp, user2);
        id.setUser1Id(user1);
        id.setUser2Id(user2);
        return repo.findById(id).orElseThrow(() -> new RuntimeException("m:: Not found!"));
    }

    @Override
    public List<Streak> getForUsername(String username) {
        return repo.findValidByUsername(username);
    }

    @Override
    public List<Streak> getForUserId(Long id) {
        return repo.findValidByUserId(id);
    }

    @Override
    public void deleteExpired() {
        repo.deleteExpired();
    }
}
