package com.example.nerve.repository.jpa;

import com.example.nerve.model.composite_key.ChallengeKey;
import com.example.nerve.model.entity.ChalResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface JpaChalResponseRepository extends JpaRepository<ChalResponse, ChallengeKey> {

    @Query("select r from ChalResponse r " +
            "where r.id.senderId = :cReceiverId and r.id.receiverId = :cSenderId and r.challengeDate = :challengeDate")
    List<ChalResponse> findByChallengeId(Long cSenderId, Long cReceiverId, Date challengeDate);

}
