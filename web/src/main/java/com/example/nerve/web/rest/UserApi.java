package com.example.nerve.web.rest;

import com.example.nerve.model.User;
import com.example.nerve.service.interfaces.iUserService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.nio.file.FileSystemException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/users",  produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class UserApi {
    private final iUserService service;

    public UserApi(iUserService service) {
        this.service = service;
    }

    @GetMapping
    public User getUser(@RequestParam(value = "id", required = false, defaultValue = "1") Long id,
                        @RequestParam(value = "username", required = false) String username) {

        if (username != null && !username.equals(""))
            return service.getByUsername(username).orElseThrow(RuntimeException::new);
        return service.getById(id).orElseThrow(RuntimeException::new);
    }

    @GetMapping("/all")
    public Page<User> allPaged(@RequestHeader(value = "page-number", required = false, defaultValue = "0") int pageNo,
                               @RequestHeader(value = "list-size", required = false, defaultValue = "10") int listSize) {

        return service.usersPaged(listSize, pageNo);
    }

    @GetMapping(params = "term")
    public List<User> search(@RequestParam String term) {
        return service.search(term);
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

    @PatchMapping(value = "/update")
    public User update(@RequestParam(value = "name", required = false) String username,
                       @RequestParam(value = "id", required = false, defaultValue = "1") Long id,
                       @ModelAttribute @Valid User user) {

        User u = new User();
        if(username != null && !username.equals("")) {
            u = service.updateUserByUsername(username,
                    Optional.ofNullable(user.getUsername()),
                    Optional.ofNullable(user.getEmail()),
                    Optional.ofNullable(user.getPassword()));
        }
        else {
            try {
                u = service.updateUserById(id,
                        Optional.ofNullable(user.getUsername()),
                        Optional.ofNullable(user.getEmail()),
                        Optional.ofNullable(user.getPassword()));
            }
            catch (Exception e) {
                e.printStackTrace();
            }
        }
        return u;
    }

    @DeleteMapping("/delete/{username}")
    public void deleteByUsername(@PathVariable String username) {
        service.deleteByUsername(username);
    }

    @DeleteMapping(value = "/delete", params = "id")
    public void deleteById(@RequestParam Long id) {
        service.deleteById(id);
    }
}
