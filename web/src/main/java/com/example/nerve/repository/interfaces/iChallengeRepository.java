package com.example.nerve.repository.interfaces;

import com.example.nerve.model.entity.Challenge;
import com.example.nerve.model.view_model.ChallengeUsers;

import java.util.List;

public interface iChallengeRepository {
    Challenge save(Challenge challenge);

    List<ChallengeUsers> search(String username);

    List<ChallengeUsers> allForUser(String username);

    List<ChallengeUsers> allForUserId(Long id);

    List<ChallengeUsers> allToUser(String username);

    List<ChallengeUsers> allToUserId(Long id);

    List<ChallengeUsers> allByUser(String username);

    List<ChallengeUsers> allByUserId(Long id);

    void deleteChallenge(Challenge challenge);

}
