package com.example.nerve.repository.interfaces;

import com.example.nerve.model.entity.Challenge;
import com.example.nerve.model.view_model.ChallengeUsers;

import java.sql.Timestamp;
import java.util.List;

public interface iChallengeRepository {

    Challenge save(Challenge challenge);

    List<Challenge> saveAll(List<Challenge> challenges);

    List<ChallengeUsers> search(String username);

    List<ChallengeUsers> allBeforeDate(Timestamp tDate);

    List<ChallengeUsers> allAfterDate(Timestamp tDate);

    List<ChallengeUsers> allForUser(String username);

    List<ChallengeUsers> allForUserId(Long id);

    List<ChallengeUsers> allToUser(String username);

    List<ChallengeUsers> allToUserId(Long id);

    List<ChallengeUsers> allByUser(String username);

    List<ChallengeUsers> allByUserId(Long id);

    void deleteChallenge(Challenge challenge);

    void deleteAll(List<Challenge> challenges);

}
