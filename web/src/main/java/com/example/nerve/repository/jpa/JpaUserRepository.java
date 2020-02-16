package com.example.nerve.repository.jpa;

import com.example.nerve.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface JpaUserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    @Query("select u from User u where u.username like %:username%")
    List<User> searchByUsername(String username);

    @Query("delete from User where username = :username")
    void deleteByUsername(String username);
}