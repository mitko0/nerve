package com.example.nerve.web.rest;

import com.example.nerve.model.User;
import com.example.nerve.service.interfaces.iUserService;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/user",  produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class UserApi {
    private final iUserService service;

    public UserApi(iUserService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public List<User> all() {
        return service.all();
    }
}
