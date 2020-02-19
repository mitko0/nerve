package com.example.nerve.service.interfaces;

import com.example.nerve.model.entity.Challenge;
import com.example.nerve.model.view_model.ChallengeUsers;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

public interface iChallengeService {

    Challenge saveChallenge(Challenge challenge);

    List<ChallengeUsers> search(String username);

    List<ChallengeUsers> allForUser(Optional<Long> id, Optional<String> username);

    List<ChallengeUsers> allByUser(Optional<Long> id, Optional<String> username);

    List<ChallengeUsers> allToUser(Optional<Long> id, Optional<String> username);

    List<ChallengeUsers> beforeDate(String timestamp);

    List<ChallengeUsers> afterDate(String timestamp);

    void deleteAll(List<Challenge> challenges);

}
