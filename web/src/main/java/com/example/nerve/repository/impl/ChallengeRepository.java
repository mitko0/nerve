package com.example.nerve.repository.impl;

import com.example.nerve.model.entity.Challenge;
import com.example.nerve.model.view_model.ChallengeUsers;
import com.example.nerve.repository.interfaces.iChallengeRepository;
import com.example.nerve.repository.jpa.JpaChallengeRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
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
    public List<Challenge> saveAll(List<Challenge> challenges) {
        return repo.saveAll(challenges);
    }

    @Override
    public List<ChallengeUsers> search(String username) {
        return repo.search(username);
    }

    @Override
    public List<ChallengeUsers> allBeforeDate(Timestamp tDate) {
        return repo.allBeforeDate(tDate);
    }

    @Override
    public List<ChallengeUsers> allAfterDate(Timestamp tDate) {
        return repo.allAfterDate(tDate);
    }

    @Override
    public List<ChallengeUsers> allForUser(String username) {
        return repo.allForUser(username);
    }

    @Override
    public List<ChallengeUsers> allForUserId(Long id) {
        return repo.allForUserId(id);
    }

    @Override
    public List<ChallengeUsers> allToUser(String username) {
        return repo.allToUser(username);
    }

    @Override
    public List<ChallengeUsers> allToUserId(Long id) {
        return repo.allToUserId(id);
    }

    @Override
    public List<ChallengeUsers> allByUser(String username) {
        return repo.allByUser(username);
    }

    @Override
    public List<ChallengeUsers> allByUserId(Long id) {
        return repo.allByUserId(id);
    }

    @Override
    public void deleteChallenge(Challenge challenge) {
        repo.delete(challenge);
    }

    @Override
    public void deleteAll(List<Challenge> challenges) {
        repo.deleteAll(challenges);
    }

}
