package com.example.nerve.web.rest;

import com.example.nerve.model.composite_key.StreakKey;
import com.example.nerve.model.entity.Streak;
import com.example.nerve.service.interfaces.iStreakService;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/streaks", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class StreakApi {
    private final iStreakService service;

    public StreakApi(iStreakService service) {
        this.service = service;
    }

    @GetMapping
    public Streak getStreak(StreakKey key) {
        return service.getForId(key);
    }

    @GetMapping(params = "username")
    public List<Streak> getForUsername(@RequestParam String username) {
        return service.getForUsername(username);
    }

    @GetMapping(params = "user-id")
    public List<Streak> getForUserId(@RequestParam(value = "user-id") Long userId) {
        return service.getForUserId(userId);
    }

    @DeleteMapping("/delete-expired")
    public void deleteExpired() {
        service.deleteExpired();
    }
}
