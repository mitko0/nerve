package com.example.nerve.model.event;

import com.example.nerve.model.entity.Challenge;
import com.example.nerve.model.view_model.ChallengeUsers;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class ChallengeEvent extends ApplicationEvent {
    public ChallengeEvent(Challenge source) {
        super(source);
    }
}