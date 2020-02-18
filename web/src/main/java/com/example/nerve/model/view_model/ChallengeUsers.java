package com.example.nerve.model.view_model;

import com.example.nerve.model.entity.Challenge;
import com.example.nerve.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeUsers {

    private Challenge challenge;

    private User sender;

    private User receiver;

}