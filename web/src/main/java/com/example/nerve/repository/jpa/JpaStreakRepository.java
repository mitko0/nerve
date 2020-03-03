package com.example.nerve.repository.jpa;

import com.example.nerve.model.composite_key.StreakKey;
import com.example.nerve.model.entity.Streak;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface JpaStreakRepository extends JpaRepository<Streak, StreakKey> {

    @Query("select s from Streak s " +
            "where s.expirationDate >= current_timestamp " +
            "and s.id = :key")
    Optional<Streak> findValidById(StreakKey key);

    @Query("select s from Streak s " +
            "where s.user1.username like :username or s.user2.username like :username")
    List<Streak> findByUsername(String username);

    @Query("select s from Streak s " +
            "where s.expirationDate >= current_timestamp " +
            "and s.user1.username like :username or s.user2.username like :username")
    List<Streak> findValidByUsername(String username);

    @Query("select s from Streak s " +
            "where s.id.user1Id = :id or s.id.user2Id = :id")
    List<Streak> findByUserId(Long id);

    @Query("select s from Streak s " +
            "where s.expirationDate >= current_timestamp " +
            "and s.id.user1Id = :id or s.id.user2Id = :id")
    List<Streak> findValidByUserId(Long id);

    @Transactional
    @Modifying
    @Query("delete from Streak s where s.expirationDate > current_timestamp ")
    void deleteExpired();
}
