package com.example.nerve.repository.jpa;

import com.example.nerve.model.Challenge;
import com.example.nerve.model.ChallengeKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JpaChallengeRepository extends JpaRepository<Challenge, ChallengeKey> {
    @Query("select c from Challenge c where c.id.receiverId = :id or c.id.senderId = :id")
    List<Challenge> allForUserId(@Param("id") Long id);

    @Query("select c from Challenge c where c.id.receiverId = :id")
    List<Challenge> allToUserId(@Param("id") Long id);

    @Query("select c from Challenge c where c.id.senderId = :id")
    List<Challenge> allByUserId(@Param("id") Long id);

    @Query("select c from Challenge c join c.sender s on c.id.senderId = s.id join c.receiver r on c.id.receiverId = r.id where s.username like :username or r.username like :username")
    List<Challenge> allForUser(@Param("username") String username);

    @Query("select c from Challenge c join c.receiver r on c.id.receiverId = r.id where r.username like :username")
    List<Challenge> allToUser(@Param("username") String username);

    @Query("select c from Challenge c join c.sender s on c.id.senderId = s.id where s.username like :username")
    List<Challenge> allByUser(@Param("username") String username);

    @Query("select c from Challenge c join c.sender s on c.id.senderId = s.id join c.receiver r on c.id.receiverId = r.id where s.username like :username% or r.username like :username%")
    List<Challenge> search(@Param("username") String username);
}
