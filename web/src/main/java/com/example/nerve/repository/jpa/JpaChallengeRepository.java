package com.example.nerve.repository.jpa;

import com.example.nerve.model.entity.Challenge;
import com.example.nerve.model.composite_key.ChallengeKey;
import com.example.nerve.model.view_model.ChallengeUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JpaChallengeRepository extends JpaRepository<Challenge, ChallengeKey> {
    @Query("select new com.example.nerve.model.view_model.ChallengeUsers(c, s, r) " +
            "from Challenge c join c.sender s on c.id.senderId = s.id join c.receiver r on c.id.receiverId = r.id " +
            "where c.id.receiverId = :id or c.id.senderId = :id")
    List<ChallengeUsers> allForUserId(@Param("id") Long id);

    @Query("select new com.example.nerve.model.view_model.ChallengeUsers(c, s, r) " +
            "from Challenge c join c.sender s on c.id.senderId = s.id join c.receiver r on c.id.receiverId = r.id " +
            "where c.id.receiverId = :id")
    List<ChallengeUsers> allToUserId(@Param("id") Long id);

    @Query("select new com.example.nerve.model.view_model.ChallengeUsers(c, s, r) " +
            "from Challenge c join c.sender s on c.id.senderId = s.id join c.receiver r on c.id.receiverId = r.id " +
            "where c.id.senderId = :id")
    List<ChallengeUsers> allByUserId(@Param("id") Long id);

    @Query("select new com.example.nerve.model.view_model.ChallengeUsers(c, s, r) " +
            "from Challenge c join c.sender s on c.id.senderId = s.id join c.receiver r on c.id.receiverId = r.id " +
            "where s.username like :username or r.username like :username")
    List<ChallengeUsers> allForUser(@Param("username") String username);

    @Query("select new com.example.nerve.model.view_model.ChallengeUsers(c, s, r) " +
            "from Challenge c join c.sender s on c.id.senderId = s.id join c.receiver r on c.id.receiverId = r.id " +
            "where r.username like :username")
    List<ChallengeUsers> allToUser(@Param("username") String username);

    @Query("select new com.example.nerve.model.view_model.ChallengeUsers(c, s, r) " +
            "from Challenge c join c.sender s on c.id.senderId = s.id join c.receiver r on c.id.receiverId = r.id " +
            "where s.username like :username")
    List<ChallengeUsers> allByUser(@Param("username") String username);

    @Query("select new com.example.nerve.model.view_model.ChallengeUsers(c, s, r) " +
            "from Challenge c join c.sender s on c.id.senderId = s.id join c.receiver r on c.id.receiverId = r.id " +
            "where s.username like :username% or r.username like :username%")
    List<ChallengeUsers> search(@Param("username") String username);

}
