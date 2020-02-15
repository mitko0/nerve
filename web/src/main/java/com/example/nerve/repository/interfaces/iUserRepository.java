package com.example.nerve.repository.interfaces;

import com.example.nerve.model.User;

public interface iUserRepository {
    User save(User user);

    User findByUsername(String username);

    void deleteByUsername(String username);
}
