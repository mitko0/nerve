package com.example.nerve.web.controllers;

import com.example.nerve.model.User;
import com.example.nerve.service.interfaces.iUserService;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/user",  produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class UserController {
    private final iUserService service;

    public UserController(iUserService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        service.createUser(user);
        return ("<h2>post registered</h2>");
    }

    @GetMapping("/register")
    public String registerTest() {
        return ("<h2>registered</h2>");
    }

    @GetMapping("/")
    public String def() {
        return ("<h2>default</h2>");
    }

    @GetMapping
    public String defas() {
        return ("<h2>user no /</h2>");
    }

    @GetMapping("/test")
    public String deff() {
        return ("<h2>test</h2>");
    }
}
