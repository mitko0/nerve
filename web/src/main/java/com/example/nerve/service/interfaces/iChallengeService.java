package com.example.nerve.service.interfaces;

import com.example.nerve.model.entity.Challenge;
import com.example.nerve.model.view_model.ChallengeUsers;
import org.joda.time.DateTime;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface iChallengeService {

    Challenge saveChallenge(Challenge challenge);

    List<Challenge> saveChallenges(Long senderId, List<Long> receiverIds, String description, Date endDate);

    List<ChallengeUsers> search(String username);

    List<ChallengeUsers> allForUser(Optional<Long> id, Optional<String> username);

    List<ChallengeUsers> allByUser(Optional<Long> id, Optional<String> username);

    List<ChallengeUsers> allToUser(Optional<Long> id, Optional<String> username);

    List<ChallengeUsers> beforeDate(DateTime date);

    List<ChallengeUsers> afterDate(DateTime date);

    Challenge updateChallenge(Challenge challenge);

    void deleteAll(List<Challenge> challenges);

}
