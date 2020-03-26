package com.example.nerve.event_listener;

import com.example.nerve.model.event.ChallengeEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class WsEventListener {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @EventListener
    public void handleChallengeCreation(ChallengeEvent event) {
        messagingTemplate.convertAndSend("/topic/public", event.getSource());
    }
}
