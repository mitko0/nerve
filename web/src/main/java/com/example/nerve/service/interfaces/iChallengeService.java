package com.example.nerve.service.interfaces;

import com.example.nerve.model.Challenge;

import java.util.List;

public interface iChallengeService {
    Challenge saveChallenge(Challenge challenge);

    List<Challenge> allByUser(String username);
}
