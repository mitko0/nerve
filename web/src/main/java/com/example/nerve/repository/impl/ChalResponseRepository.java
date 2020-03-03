package com.example.nerve.repository.impl;

import com.example.nerve.model.composite_key.ChallengeKey;
import com.example.nerve.model.entity.ChalResponse;
import com.example.nerve.repository.interfaces.iChalResponseRepository;
import com.example.nerve.repository.jpa.JpaChalResponseRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public class ChalResponseRepository implements iChalResponseRepository {

    private final JpaChalResponseRepository repo;

    public ChalResponseRepository(JpaChalResponseRepository repo) {
        this.repo = repo;
    }

    @Override
    public ChalResponse save(ChalResponse response) {
        return repo.save(response);
    }

    @Override
    public Optional<ChalResponse> findById(ChallengeKey id) {
        return repo.findById(id);
    }

    @Override
    public List<ChalResponse> findByChallengeId(Long cSenderId, Long cReceiverId, Date challengeDate) {
        return repo.findByChallengeId(cSenderId, cReceiverId, challengeDate);
    }

    @Override
    public void delete(ChalResponse response) {
        repo.delete(response);
    }

    @Override
    public void deleteById(ChallengeKey key) {
        repo.deleteById(key);
    }

    @Override
    public void deletePublic(Long responderId, Long receiverId, Date createDate) {
        repo.deletePublic(responderId, receiverId, createDate);
    }
}
