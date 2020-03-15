package com.example.nerve.repository.interfaces;

import com.example.nerve.model.composite_key.ChallengeKey;
import com.example.nerve.model.entity.ChalResponse;
import com.example.nerve.model.entity.User;
import com.example.nerve.model.view_model.DataHolder;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface iChalResponseRepository {

    ChalResponse save(ChalResponse response);

    Optional<ChalResponse> findById(ChallengeKey id);

    List<ChalResponse> findByChallengeId(Long cSenderId, Long cReceiverId, Date challengeDate);

    List<DataHolder<ChalResponse, User>> findWithUserByChallengeId(Long cSenderId, Long cReceiverId, Date challengeDate);

    void delete(ChalResponse response);

    void deleteById(ChallengeKey key);

    void deletePublic(Long responderId, Long receiverId, Date createDate);
}
