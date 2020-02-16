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
    public String showImage(HttpServletRequest request) throws IOException {
        Resource resource = new ClassPathResource("classpath:lada1.jpg");
        request.setAttribute("img", "/profilePics/default.jpg");
        return "image-template";
    }

    @GetMapping("/newUser")
    public String newUser(HttpServletRequest request) throws IOException {
        return "new-user";
    }
}
