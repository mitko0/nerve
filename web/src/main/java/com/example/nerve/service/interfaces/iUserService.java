package com.example.nerve.service.interfaces;

import com.example.nerve.model.User;

public interface iUserService {
    User createUser(User user);

    User getByUsername(String username);

    void deleteByUsername(String username);
}
