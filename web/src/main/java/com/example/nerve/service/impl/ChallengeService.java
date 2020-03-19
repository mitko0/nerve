package com.example.nerve.service.impl;

import com.example.nerve.model.composite_key.ChallengeKey;
import com.example.nerve.model.entity.Challenge;
import com.example.nerve.model.entity.User;
import com.example.nerve.model.view_model.ChallengeUsers;
import com.example.nerve.repository.interfaces.iChallengeRepository;
import com.example.nerve.repository.interfaces.iUserRepository;
import com.example.nerve.service.interfaces.iChallengeService;
import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
public class ChallengeService implements iChallengeService {
    private final iChallengeRepository repo;
    private final iUserRepository userRepo;

    public ChallengeService(iChallengeRepository repo, iUserRepository userRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
    }

    @Override
    public Challenge saveChallenge(Challenge challenge) {
        long senderId = challenge.getId().getSenderId();
        long receiverId = challenge.getId().getReceiverId();

        User sender = userRepo.findById(senderId).orElseThrow(() -> new RuntimeException("m:: User not found!"));
        User receiver = userRepo.findById(receiverId).orElseThrow(() -> new RuntimeException("m:: User not found!"));

        sender.challenge(challenge);
        receiver.acceptChallenge(challenge);

        DateTime nowDt = new DateTime(DateTimeZone.UTC);
        challenge.getId().setCreateDate(nowDt.toDate());

        if (challenge.getEndDate() == null) {
            challenge.setEndDate(nowDt.plusMinutes(10).toDate());
        } else {
            DateTime challengeEndDt = new DateTime(challenge.getEndDate(), DateTimeZone.UTC);
            challenge.setEndDate(challengeEndDt.toDate());
            if (challengeEndDt.isBefore(nowDt))
                challenge.setEndDate(nowDt.plusMinutes(10).toDate());
        }

        challenge.setResponded(false);
        return repo.save(challenge);
    }

    @Override
    public List<Challenge> saveChallenges(Long senderId, List<Long> receiverIds, String description, Date endDate) {
        List<Challenge> challenges = new ArrayList<>();

        DateTime endDt;
        DateTime nowDt = new DateTime(DateTimeZone.UTC);

        if (endDate == null) {
            endDt = nowDt.plusMinutes(10);
        } else {
            endDt = new DateTime(endDate, DateTimeZone.UTC);
            if (endDt.isBefore(nowDt))
                endDt = nowDt.plusMinutes(10);
        }

        for (long id : receiverIds) {
            ChallengeKey key = new ChallengeKey(senderId, id, nowDt.toDate());
            Challenge challenge = new Challenge();

            challenge.setId(key);
            challenge.setDescription(description);
            challenge.setEndDate(endDt.toDate());

            challenges.add(challenge);
        }

        return repo.saveAll(challenges);
    }

    @Override
    public List<ChallengeUsers> search(String username) {
        return repo.search(username);
    }

    @Override
    public List<ChallengeUsers> allForUser(Optional<Long> id, Optional<String> username) {
        if (id.isPresent()) {
            return repo.allForUserId(id.get());
        }

        if (username.isPresent()) {
            return repo.allForUser(username.get());
        }

        throw new RuntimeException("m:: Nothing to search for!");
    }

    @Override
    public List<ChallengeUsers> allByUser(Optional<Long> id, Optional<String> username) {
        if (id.isPresent()) {
            return repo.allByUserId(id.get());
        }

        if (username.isPresent()) {
            return repo.allByUser(username.get());
        }

        throw new RuntimeException("m:: Nothing to search for!");
    }

    @Override
    public List<ChallengeUsers> allToUser(Optional<Long> id, Optional<String> username) {
        if (id.isPresent()) {
            return repo.allToUserId(id.get());
        }

        if (username.isPresent()) {
            return repo.allToUser(username.get());
        }

        throw new RuntimeException("m:: Nothing to search for!");
    }

    @Override
    public List<ChallengeUsers> beforeDate(DateTime date) {
        DateTime utc = new DateTime(date, DateTimeZone.UTC);
        return repo.allBeforeDate(utc.toDate());
    }

    @Override
    public List<ChallengeUsers> afterDate(DateTime date) {
        DateTime utc = new DateTime(date, DateTimeZone.UTC);
        return repo.allAfterDate(utc.toDate());
    }

    @Override
    public Challenge updateChallenge(Challenge challenge) {
        ChallengeKey key = challenge.getId();

        Challenge update = repo.findById(key).orElseThrow(() -> new RuntimeException("m:: Invalid id!"));
        update.setDescription(challenge.getDescription());
        DateTime cEndDateDt = challenge.getEndDate() != null
                ? new DateTime(challenge.getEndDate(), DateTimeZone.UTC)
                : new DateTime(update.getEndDate());
        update.setEndDate(cEndDateDt.toDate());
        return repo.save(update);
    }

    @Override
    public void deleteAll(List<Challenge> challenges) {
        repo.deleteAll(challenges);
    }

}
