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
        request.setAttribute("img", "/responseFiles/video/2_1_2020_03_03_12_08_54_075_01_00.mp4");
        return "video-template";
    }

    @GetMapping("/newUser")
    public String newUser(HttpServletRequest request) throws IOException {
        return "new-user";
    }
}
