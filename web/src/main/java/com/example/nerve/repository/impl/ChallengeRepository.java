package com.example.nerve.repository.impl;

import com.example.nerve.model.Challenge;
import com.example.nerve.repository.interfaces.iChallengeRepository;
import com.example.nerve.repository.jpa.JpaChallengeRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ChallengeRepository implements iChallengeRepository {
    private final JpaChallengeRepository repo;

    public ChallengeRepository(JpaChallengeRepository repo) {
        this.repo = repo;
    }

    @Override
    public Challenge save(Challenge challenge) {
        return repo.save(challenge);
    }

    @Override
    public List<Challenge> search(String username) {
        return repo.search(username);
    }

    @Override
    public List<Challenge> allForUser(String username) {
        return repo.allForUser(username);
    }

    @Override
    public List<Challenge> allForUserId(Long id) {
        return repo.allForUserId(id);
    }

    @Override
    public List<Challenge> allToUser(String username) {
        return repo.allToUser(username);
    }

    @Override
    public List<Challenge> allToUserId(Long id) {
        return allToUserId(id);
    }

    @Override
    public List<Challenge> allByUser(String username) {
        return repo.allByUser(username);
    }

    @Override
    public List<Challenge> allByUserId(Long id) {
        return repo.allByUserId(id);
    }

    @Override
    public void deleteChallenge(Challenge challenge) {
        repo.delete(challenge);
    }
}
