package com.example.nerve.web.rest;

import com.example.nerve.model.entity.User;
import com.example.nerve.service.interfaces.iUserService;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/users")
public class UserApi {
    private final iUserService service;

    public UserApi(iUserService service) {
        this.service = service;
    }

    @GetMapping
    public User getUser(@RequestParam(value = "id", required = false) Long id,
                        @RequestParam(value = "username", required = false) String username) {

        return service.getUser(Optional.ofNullable(id), Optional.ofNullable(username));
    }

    @GetMapping("/all")
    public Page<User> allPaged(@RequestHeader(value = "page-number", required = false, defaultValue = "0") int pageNo,
                               @RequestHeader(value = "list-size", required = false, defaultValue = "10") int listSize) {

        return service.usersPaged(listSize, pageNo);
    }

    @GetMapping(params = "term")
    public List<User> search(@RequestParam String term) {
//        if (term.trim().length() != 0)
            return service.search(term);
//        return new ArrayList<>();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User newUser(@ModelAttribute @Valid User user,
                        @RequestParam(value = "pic", required = false) MultipartFile pic,
                        HttpServletResponse response,
                        UriComponentsBuilder builder) {

        response.setHeader("Location", builder.path("/api/users?username={username}")
                .buildAndExpand(user.getUsername()).toUriString());
        return service.createUser(user, pic);
    }

    @PatchMapping
    public User update(@RequestParam(value = "id", required = false) Long id,
                       @RequestParam(value = "name", required = false) String username,
                       @ModelAttribute @Valid User user) {

        return service.updateUser(Optional.ofNullable(id), Optional.ofNullable(username),
                Optional.ofNullable(user.getUsername()),
                Optional.ofNullable(user.getEmail()),
                Optional.ofNullable(user.getPassword()));
    }

    @PatchMapping(value = "/updatePic")
    public User updateProfilePic(@RequestParam(value = "name", required = false) String username,
                                 @RequestParam(value = "id", required = false) Long id,
                                 @RequestAttribute MultipartFile pic) {

        return service.updateProfilePic(Optional.ofNullable(id),
                Optional.ofNullable(username),
                pic);
    }

    @DeleteMapping("/delete")
    public void deleteUser(@RequestParam(value = "id", required = false) Long id,
                           @RequestParam(value = "username", required = false) String username) {

        service.deleteUser(Optional.ofNullable(id), Optional.ofNullable(username));
    }

}
