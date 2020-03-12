package com.example.nerve.web.controllers;

import com.example.nerve.model.composite_key.ChallengeKey;
import com.example.nerve.model.entity.ChalResponse;
import com.example.nerve.model.entity.Challenge;
import com.example.nerve.model.entity.Streak;
import com.example.nerve.service.interfaces.iChalResponseService;
import com.example.nerve.service.interfaces.iStreakService;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RestController
@RequestMapping(path = "/test", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class mRestController {
    private final iStreakService streakService;
    private final iChalResponseService responseService;

    public mRestController(iStreakService service, iChalResponseService responseService) {
        this.streakService = service;
        this.responseService = responseService;
    }

    @PostMapping(value = "/streaks", params = {"id1", "id2"})
    public Streak beginStreak(@RequestParam Long id1, @RequestParam Long id2) {
        return streakService.setStreak(id1, id2);
    }
}
