package com.example.nerve.web.rest;

import com.example.nerve.model.entity.Challenge;
import com.example.nerve.model.view_model.ChallengeUsers;
import com.example.nerve.service.interfaces.iChallengeService;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/challenge",  produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class ChallengeApi {
    private final iChallengeService service;

    public ChallengeApi(iChallengeService service) {
        this.service = service;
    }

    @PostMapping("/new")
    public Challenge newChallenge(@RequestBody Challenge challenge) {
        return service.saveChallenge(challenge);
    }

    @GetMapping(value = "/search", params = "username")
    public List<ChallengeUsers> by(@RequestParam String username) {
        return service.search(username);
    }
}
