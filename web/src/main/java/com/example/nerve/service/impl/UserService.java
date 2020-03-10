package com.example.nerve.service.impl;

import com.example.nerve.model.Constants;
import com.example.nerve.model.entity.Challenge;
import com.example.nerve.model.entity.Role;
import com.example.nerve.model.entity.User;
import com.example.nerve.repository.interfaces.iChallengeRepository;
import com.example.nerve.repository.interfaces.iRoleRepository;
import com.example.nerve.repository.interfaces.iUserRepository;
import com.example.nerve.service.interfaces.iUserService;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService implements iUserService {
    private final BCryptPasswordEncoder encoder;
    private final iUserRepository userRepo;
    private final iRoleRepository roleRepo;
    private final iChallengeRepository chalRepo;


    public UserService(BCryptPasswordEncoder encoder, iUserRepository repo, iRoleRepository roleRepo, iChallengeRepository chalRepo) {
        this.encoder = encoder;
        this.userRepo = repo;
        this.roleRepo = roleRepo;
        this.chalRepo = chalRepo;
    }

    @Override
    public User createUser(User user, MultipartFile pic) {
        if (pic != null && !pic.getContentType().startsWith("image"))
            throw new RuntimeException("m:: Not an image");

        if (pic == null || pic.isEmpty()) {
            user.setProfilePicLocation(String
                    .format("%s/%s",
                            Constants.profileImageFolder,
                            Constants.defaultProfilePicture));
        } else {
            try {
                String location = Constants.saveFile(pic, user.getUsername(), Constants.profileImageFolder);
                user.setProfilePicLocation(location);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        Role role = roleRepo.findByName("user").orElseThrow();
        user.setRole(role);
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    @Override
    public User updateUser(Optional<Long> id,
                           Optional<String> username,
                           Optional<String> newUsername,
                           Optional<String> email,
                           Optional<String> password) {

        if (id.isEmpty() && username.isEmpty())
            throw new RuntimeException("Nothing to search by!");

        final User[] user = {new User()};

        id.ifPresent((val) ->
                user[0] = userRepo.findById(val).orElseThrow(RuntimeException::new));

        username.ifPresent((val) ->
                user[0] = userRepo.findByUsername(val).orElseThrow(RuntimeException::new));

        String name = newUsername.orElse(user[0].getUsername());
        String pwd = password.orElse(user[0].getPassword());
        String mail = email.orElse(user[0].getEmail());

        // don't change default picture's name
        if (!user[0].getProfilePicLocation()
                .equals(String.format("%s/%s",
                        Constants.profileImageFolder,
                        Constants.defaultProfilePicture))) {
            try {
                String newLocation = Constants.renameFile(user[0].getProfilePicLocation(), name, Constants.profileImageFolder);
                user[0].setProfilePicLocation(newLocation);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        user[0].setUsername(name);
        user[0].setEmail(mail);
        user[0].setPassword(encoder.encode(pwd));
        return userRepo.save(user[0]);
    }

    @Override
    public User updateUser(@NotNull User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    @Override
    public User updateProfilePic(Optional<Long> id, Optional<String> username, MultipartFile pic) {
        if (id.isEmpty() && username.isEmpty())
            throw new RuntimeException("m:: Nothing to search by!");

        if (!Objects.requireNonNull(pic.getContentType()).toLowerCase().startsWith("image"))
            throw new RuntimeException("m:: Not an image");

        final User[] user = {new User()};

        id.ifPresent((val) ->
                user[0] = userRepo.findById(val).orElseThrow(RuntimeException::new));

        username.ifPresent((val) ->
                user[0] = userRepo.findByUsername(val).orElseThrow(RuntimeException::new));

        if (pic.isEmpty())
            return user[0];

        try {
            Constants.saveFile(pic, user[0].getUsername(), Constants.profileImageFolder);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return user[0];
    }

    @Override
    public List<User> allUsers() {
        return userRepo.findAll();
    }

    @Override
    public Page<User> usersPaged(int listSize, int pageNo) {
        return userRepo.findPageable(PageRequest.of(pageNo, listSize));
    }

    @Override
    public List<User> search(String term) {
        return userRepo.searchByUsername(term);
    }

    @Override
    public User getUser(Optional<Long> id, Optional<String> username) {
        if (id.isEmpty() && username.isEmpty())
            throw new RuntimeException("m:: Nothing to search by!");

        final User[] user = {new User()};

        id.ifPresent((val) -> user[0] = userRepo.findById(val)
                .orElseThrow(() -> new RuntimeException("m:: User not found!")));

        username.ifPresent((val) -> user[0] = userRepo.findByUsername(val)
                .orElseThrow(() -> new RuntimeException("m:: User not found!")));

        return user[0];
    }

    @Override
    public void deleteUser(Optional<Long> id, Optional<String> username) {
        if (id.isEmpty() && username.isEmpty())
            throw new RuntimeException("m:: Nothing to search by!");

        id.ifPresent((val) -> {
            User user = userRepo.findById(val).orElseThrow(() -> new RuntimeException("m:: User not found!"));
            List<Challenge> challenges = new ArrayList<>(user.getChallengesFrom());
            challenges.addAll(user.getChallengesTo());
            chalRepo.deleteAll(challenges);
            userRepo.deleteById(val);
        });

        username.ifPresent((val) -> {
            User user = userRepo.findByUsername(val).orElseThrow(() -> new RuntimeException("m:: User not found!"));
            List<Challenge> challenges = new ArrayList<>(user.getChallengesFrom());
            challenges.addAll(user.getChallengesTo());
            chalRepo.deleteAll(challenges);
            userRepo.deleteByUsername(val);
        });
    }
}
