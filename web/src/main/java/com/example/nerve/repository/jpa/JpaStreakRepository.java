package com.example.nerve.repository.jpa;

import com.example.nerve.model.composite_key.StreakKey;
import com.example.nerve.model.entity.Streak;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface JpaStreakRepository extends JpaRepository<Streak, StreakKey> {

    @Query("select s from Streak s " +
            "where s.expirationDate >= current_timestamp and s.id = :key")
    Optional<Streak> findByIdValid(StreakKey key);

    @Query("select s from Streak s " +
            "where s.user1.username like :username or s.user2.username like :username")
    List<Streak> findByUsername(String username);

    @Query("select s from Streak s " +
            "where s.user1.id = :id or s.user2.id = :id")
    List<Streak> findByUserId(Long id);

    @Query("delete from Streak s where s.expirationDate > current_timestamp ")
    void deleteExpired();
}
