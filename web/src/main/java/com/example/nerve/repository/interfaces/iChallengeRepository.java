package com.example.nerve.repository.interfaces;

import com.example.nerve.model.composite_key.ChallengeKey;
import com.example.nerve.model.entity.Challenge;
import com.example.nerve.model.view_model.ChallengeUsers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface iChallengeRepository {

    Challenge save(Challenge challenge);

    List<Challenge> saveAll(List<Challenge> challenges);

    Optional<Challenge> findById(ChallengeKey key);

    List<ChallengeUsers> search(String username);

    Page<ChallengeUsers> findPageableForUserId(Long userId, Pageable pageable);

    List<ChallengeUsers> allBeforeDate(Date tDate);

    List<ChallengeUsers> allAfterDate(Date tDate);

    List<ChallengeUsers> allForUser(String username);

    List<ChallengeUsers> allForUserId(Long id);

    List<ChallengeUsers> allToUser(String username);

    List<ChallengeUsers> allToUserId(Long id);

    List<ChallengeUsers> allByUser(String username);

    List<ChallengeUsers> allByUserId(Long id);

    void deleteChallenge(Challenge challenge);

    void deleteAll(List<Challenge> challenges);

}
