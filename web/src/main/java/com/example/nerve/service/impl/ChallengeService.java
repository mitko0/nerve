package com.example.nerve.service.impl;

import com.example.nerve.model.Challenge;
import com.example.nerve.repository.interfaces.iChallengeRepository;
import com.example.nerve.service.interfaces.iChallengeService;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;


@Service
public class ChallengeService implements iChallengeService {
    private final iChallengeRepository repo;

    public ChallengeService(iChallengeRepository repo) {
        this.repo = repo;
    }

    @Override
    public Challenge saveChallenge(Challenge challenge) {
        Date now = new Date();
        Timestamp t = new Timestamp(now.getTime());
        challenge.getId().setDateCreated(t);
        return repo.save(challenge);
    }

    @Override
    public List<Challenge> allByUser(String username) {
        return repo.allByUser(username);
    }
}