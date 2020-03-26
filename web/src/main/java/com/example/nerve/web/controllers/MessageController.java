package com.example.nerve.web.controllers;

import com.example.nerve.model.entity.User;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {

    @MessageMapping("/chat.register")
    @SendTo("/topic/public")
    public User register(@Payload User user) {
        return user;
    }

    @MessageMapping("/user")
    @SendTo("/topic/public")
    public User sendMessage(@Payload User user) {
        return user;
    }
}
