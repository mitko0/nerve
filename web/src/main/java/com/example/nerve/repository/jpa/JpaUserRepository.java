package com.example.nerve.repository.jpa;

import com.example.nerve.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Optional;

public interface JpaUserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    @Query("select count(u.id) from User u")
    long totalUserCount();

    @Query("select u from User u where length(:username)>=1 and u.username like :username%")
    List<User> searchByUsername(String username);

    @Transactional
    @Modifying
    @Query("delete from User where username = :username")
    void deleteByUsername(String username);

}
