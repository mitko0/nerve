package com.example.nerve.service.interfaces;

import com.example.nerve.model.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface iUserService {
    User createUser(User user, MultipartFile pic);

    User updateUser(Optional<Long> id, Optional<String> username,
                    Optional<String> newUsername,
                    Optional<String> email,
                    Optional<String> password);

    User updateUser(User user);

    User updateProfilePic(Optional<Long> id, Optional<String> username, MultipartFile pic);

    List<User> allUsers();

    Page<User> usersPaged(int listSize, int pageNo);

    List<User> search(String term);

    User getUser(Optional<Long> id, Optional<String> username);

    void deleteUser(Optional<Long> id, Optional<String> username);
}
