package com.example.nerve.repository.interfaces;

import com.example.nerve.model.composite_key.ChallengeKey;
import com.example.nerve.model.entity.ChalResponse;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface iChalResponseRepository {

    ChalResponse save(ChalResponse response);

    Optional<ChalResponse> findById(ChallengeKey id);

    List<ChalResponse> findByChallengeId(Long cSenderId, Long cReceiverId, Date challengeDate);

    void delete(ChalResponse response);

    void deleteById(ChallengeKey key);
}
