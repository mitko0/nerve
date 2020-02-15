package com.example.nerve.repository.interfaces;

import com.example.nerve.model.Challenge;

import java.util.List;

public interface iChallengeRepository {
    Challenge save(Challenge challenge);

    List<Challenge> search(String username);

    List<Challenge> allForUser(String username);

    List<Challenge> allForUserId(Long id);

    List<Challenge> allToUser(String username);

    List<Challenge> allToUserId(Long id);

    List<Challenge> allByUser(String username);

    List<Challenge> allByUserId(Long id);

    void deleteChallenge(Challenge challenge);
}
