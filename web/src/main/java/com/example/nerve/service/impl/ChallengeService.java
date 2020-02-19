package com.example.nerve.service.impl;

import com.example.nerve.model.entity.Challenge;
import com.example.nerve.model.entity.User;
import com.example.nerve.model.view_model.ChallengeUsers;
import com.example.nerve.repository.interfaces.iChallengeRepository;
import com.example.nerve.repository.interfaces.iUserRepository;
import com.example.nerve.service.interfaces.iChallengeService;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
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
        User sender = userRepo.findById(challenge.getId().getSenderId()).orElseThrow(() -> new RuntimeException("m:: User not found!"));
        User receiver = userRepo.findById(challenge.getId().getReceiverId()).orElseThrow(() -> new RuntimeException("m:: User not found!"));

        sender.challenge(challenge);
        receiver.acceptChallenge(challenge);

        Date now = new Date();
        //new Timestamp( ZonedDateTime.now(ZoneId.of("UTC")).toInstant().toEpochMilli() );
        // timezone diff bug, hardcoded
        Timestamp t = new Timestamp(now.getTime() + 60*60*1000);
        challenge.getId().setDateCreated(t);

        if (challenge.getDateEnd() == null || challenge.getDateEnd().before(t)) {
            Timestamp t24 = new Timestamp(t.getTime() + 24*60*60*1000);
            challenge.setDateEnd(t24);
        }

        return repo.save(challenge);
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
    public List<ChallengeUsers> beforeDate(String timestamp) {
        Timestamp ts = Timestamp.valueOf(timestamp);
        return repo.allBeforeDate(ts);
    }

    @Override
    public List<ChallengeUsers> afterDate(String timestamp) {
        Timestamp ts = Timestamp.valueOf(timestamp);
        return repo.allAfterDate(ts);
    }

    @Override
    public void deleteAll(List<Challenge> challenges) {
        repo.deleteAll(challenges);
    }

}
