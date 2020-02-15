package com.example.nerve.repository.jpa;

import com.example.nerve.model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;
import java.util.Optional;

public interface JpaUserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    void deleteByUsername(String username);

//    @Query("select u from User u where :pageable")
//    List<User> usersByPoints(@Param("pageable") Pageable pageable);
}
