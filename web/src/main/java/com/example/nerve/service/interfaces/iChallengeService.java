package com.example.nerve.service.interfaces;

import com.example.nerve.model.entity.Challenge;
import com.example.nerve.model.view_model.ChallengeUsers;

import java.util.List;

public interface iChallengeService {
    Challenge saveChallenge(Challenge challenge);

    List<ChallengeUsers> search(String username);

    List<ChallengeUsers> allByUser(String username);

}
