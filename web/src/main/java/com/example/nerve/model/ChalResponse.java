package com.example.nerve.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "chal_response")
public class ChalResponse {
    @EmbeddedId
    ChallengeKey id = new ChallengeKey();

    @JsonIgnore
    @ManyToOne
    @MapsId("sender_id")
    @JoinColumn(name = "sender_id")
    private User sender;

    @JsonIgnore
    @ManyToOne
    @MapsId("receiver_id")
    @JoinColumn(name = "receiver_id")
    private User receiver;

    @Column(name = "response_file")
    private String responseFile;
}
