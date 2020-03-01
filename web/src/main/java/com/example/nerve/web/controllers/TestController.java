package com.example.nerve.web.controllers;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Controller
public class TestController {

    @GetMapping("/views")
    public String showImage(HttpServletRequest request) {
        request.setAttribute("img", "/responseFiles/asd.mp4");
        return "video-template";
    }

    @GetMapping("/newUser")
    public String newUser(HttpServletRequest request) throws IOException {
        return "new-user";
    }
}
