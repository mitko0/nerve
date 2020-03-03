package com.example.nerve.service.impl;

import com.example.nerve.model.composite_key.ChallengeKey;
import com.example.nerve.model.entity.Challenge;
import com.example.nerve.model.entity.User;
import com.example.nerve.model.view_model.ChallengeUsers;
import com.example.nerve.repository.interfaces.iChallengeRepository;
import com.example.nerve.repository.interfaces.iUserRepository;
import com.example.nerve.service.interfaces.iChallengeService;
import org.joda.time.DateTime;
import org.springframework.stereotype.Service;

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

        DateTime nowDt = new DateTime();
        //db time bug
        nowDt = nowDt.plusHours(1);
        challenge.getId().setCreateDate(nowDt.toDate());

        if (challenge.getEndDate() == null || challenge.getEndDate().before(nowDt.minusHours(1).toDate())) {
            /*//production xd
            challenge.setEndDate(nowDt.plusDays(1).toDate());*/
            //development
            challenge.setEndDate(nowDt.plusMinutes(4).toDate());
        }
        else {
            //db time bug
            DateTime endDate = new DateTime(challenge.getEndDate());
            challenge.setEndDate(endDate.plusHours(1).toDate());
        }

        challenge.setResponded(false);
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
    public List<ChallengeUsers> beforeDate(DateTime date) {
        //db time bug
        return repo.allBeforeDate(date.plusHours(1).toDate());
    }

    @Override
    public List<ChallengeUsers> afterDate(DateTime date) {
        //db time bug
        return repo.allAfterDate(date.plusHours(1).toDate());
    }

    @Override
    public Challenge updateChallenge(Challenge challenge) {
        DateTime cCreateDateDt = new DateTime(challenge.getId().getCreateDate());
        DateTime cEndDateDt = new DateTime(challenge.getEndDate());

        //db time bug
        ChallengeKey key = challenge.getId();
        key.setCreateDate(cCreateDateDt.plusHours(1).toDate());

        Challenge update = repo.findById(key).orElseThrow(() -> new RuntimeException("m:: Invalid id!"));
        update.setDescription(challenge.getDescription());
        //db time bug
        update.setEndDate(cEndDateDt.plusHours(1).toDate());
        return repo.save(update);
    }

    @Override
    public void deleteAll(List<Challenge> challenges) {
        repo.deleteAll(challenges);
    }

}
