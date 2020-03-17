package com.example.nerve.repository.jpa;

import com.example.nerve.model.composite_key.ChallengeKey;
import com.example.nerve.model.entity.ChalResponse;
import com.example.nerve.model.entity.User;
import com.example.nerve.model.view_model.DataHolder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

public interface JpaChalResponseRepository extends JpaRepository<ChalResponse, ChallengeKey> {

    @Query("select new com.example.nerve.model.view_model.DataHolder(r, u) " +
            "from ChalResponse r join User u on (u.id <> -1 and r.id.senderId = u.id) or (r.publicResponder = u.id) " +
            "where r.id.senderId = :cReceiverId and r.id.receiverId = :cSenderId and r.challengeDate = :challengeDate " +
            "order by r.id.createDate desc ")
    List<DataHolder<ChalResponse, User>> findWithUserByChallengeId(Long cSenderId, Long cReceiverId, Date challengeDate);

    @Query("select r from ChalResponse r " +
            "where r.id.senderId = :cReceiverId and r.id.receiverId = :cSenderId and r.challengeDate = :challengeDate")
    List<ChalResponse> findByChallengeId(Long cSenderId, Long cReceiverId, Date challengeDate);

    @Transactional
    @Modifying
    @Query("delete from ChalResponse r " +
            "where r.id.receiverId = :receiverId and r.id.createDate = :createDate and r.publicResponder = :responderId")
    void deletePublic(Long responderId, Long receiverId, Date createDate);

}
