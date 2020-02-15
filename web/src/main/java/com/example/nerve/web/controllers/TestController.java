package com.example.nerve.web.controllers;

import com.example.nerve.model.Test;
import com.example.nerve.repository.interfaces.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/rest")
public class TestController {
    @Autowired
    TestRepository repo;

    @GetMapping(value = "/all")
    public List<Test> getAll() {
        return repo.findAll();
    }

    @PostMapping(value = "/load")
    public List<Test> persist(@RequestBody final Test t) {
        repo.save(t);
        return repo.findAll();
    }
}
