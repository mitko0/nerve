package com.example.nerve.repository.jpa;

import com.example.nerve.model.entity.Challenge;
import com.example.nerve.model.composite_key.ChallengeKey;
import com.example.nerve.model.view_model.ChallengeUsers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface JpaChallengeRepository extends JpaRepository<Challenge, ChallengeKey> {

    @Query("select new com.example.nerve.model.view_model.ChallengeUsers(c, s, r) " +
            "from Challenge c join c.sender s on c.id.senderId = s.id join c.receiver r on c.id.receiverId = r.id " +
            "where c.endDate >= current_timestamp " +
            "and (c.id.receiverId = :id or c.id.senderId = :id)")
    Page<ChallengeUsers> findPageableForId(long id, Pageable pageable);

    @Query("select c from Challenge c " +
            "where c.endDate >= current_timestamp " +
            "and c.id = :key")
    Optional<Challenge> findValidById(ChallengeKey key);

    @Query("select new com.example.nerve.model.view_model.ChallengeUsers(c, s, r) " +
            "from Challenge c join c.sender s on c.id.senderId = s.id join c.receiver r on c.id.receiverId = r.id " +
            "where c.endDate >= current_timestamp " +
            "and (c.id.receiverId = :id or c.id.senderId = :id) " +
            "order by c.version desc ")
    List<ChallengeUsers> allForUserId(@Param("id") Long id);

    @Query("select new com.example.nerve.model.view_model.ChallengeUsers(c, s, r) " +
            "from Challenge c join c.sender s on c.id.senderId = s.id join c.receiver r on c.id.receiverId = r.id " +
            "where c.endDate >= current_timestamp " +
            "and c.id.receiverId = :id " +
            "order by c.version desc ")
    List<ChallengeUsers> allToUserId(@Param("id") Long id);

    @Query("select new com.example.nerve.model.view_model.ChallengeUsers(c, s, r) " +
            "from Challenge c join c.sender s on c.id.senderId = s.id join c.receiver r on c.id.receiverId = r.id " +
            "where c.endDate >= current_timestamp " +
            "and c.id.senderId = :id " +
            "order by c.version desc ")
    List<ChallengeUsers> allByUserId(@Param("id") Long id);

    @Query("select new com.example.nerve.model.view_model.ChallengeUsers(c, s, r) " +
            "from Challenge c join c.sender s on c.id.senderId = s.id join c.receiver r on c.id.receiverId = r.id " +
            "where c.endDate >= current_timestamp " +
            "and (s.username like :username or r.username like :username) " +
            "order by c.version desc ")
    List<ChallengeUsers> allForUser(@Param("username") String username);

    @Query("select new com.example.nerve.model.view_model.ChallengeUsers(c, s, r) " +
            "from Challenge c join c.sender s on c.id.senderId = s.id join c.receiver r on c.id.receiverId = r.id " +
            "where c.endDate >= current_timestamp " +
            "and r.username like :username " +
            "order by c.version desc ")
    List<ChallengeUsers> allToUser(@Param("username") String username);

    @Query("select new com.example.nerve.model.view_model.ChallengeUsers(c, s, r) " +
            "from Challenge c join c.sender s on c.id.senderId = s.id join c.receiver r on c.id.receiverId = r.id " +
            "where c.endDate >= current_timestamp " +
            "and s.username like :username " +
            "order by c.version desc ")
    List<ChallengeUsers> allByUser(@Param("username") String username);

    @Query("select new com.example.nerve.model.view_model.ChallengeUsers(c, s, r) " +
            "from Challenge c join c.sender s on c.id.senderId = s.id join c.receiver r on c.id.receiverId = r.id " +
            "where c.endDate >= current_timestamp " +
            "and (s.username like :username% or r.username like :username%) " +
            "order by c.version desc ")
    List<ChallengeUsers> search(@Param("username") String username);

    @Query("select new com.example.nerve.model.view_model.ChallengeUsers(c, s, r) " +
            "from Challenge c join c.sender s on c.id.senderId = s.id join c.receiver r on c.id.receiverId = r.id " +
            "where c.endDate >= current_timestamp " +
            "and c.endDate <= :tDate")
    List<ChallengeUsers> allBeforeDate(Date tDate);

    @Query("select new com.example.nerve.model.view_model.ChallengeUsers(c, s, r) " +
            "from Challenge c join c.sender s on c.id.senderId = s.id join c.receiver r on c.id.receiverId = r.id " +
            "where c.endDate >= current_timestamp " +
            "and c.endDate >= :tDate")
    List<ChallengeUsers> allAfterDate(Date tDate);

}
