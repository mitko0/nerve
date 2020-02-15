package com.example.nerve.service.interfaces;

import com.example.nerve.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface iUserService {
    User createUser(User user);

    User updateUserById(Long id,
                                  Optional<String> username,
                                  Optional<String> email,
                                  Optional<String> password);

    User updateUserByUsername(String username,
                                        Optional<String> newUsername,
                                        Optional<String> email,
                                        Optional<String> password);

    User updateUser(User user);

    List<User> all();

    Page<User> usersPaged(Pageable pageable);

    Optional<User> getByUsername(String username);

    Optional<User> getById(Long id);

    void deleteByUsername(String username);

    void deleteById(Long id);
}
