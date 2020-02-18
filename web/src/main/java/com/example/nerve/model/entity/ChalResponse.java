package com.example.nerve.model.entity;

import com.example.nerve.model.composite_key.ChallengeKey;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

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
    @NotFound(action = NotFoundAction.IGNORE)
    @MapsId("sender_id")
    @JoinColumn(name = "sender_id")
    private User sender;

    @JsonIgnore
    @ManyToOne
    @NotFound(action = NotFoundAction.IGNORE)
    @MapsId("receiver_id")
    @JoinColumn(name = "receiver_id")
    private User receiver;

    @Column(name = "response_file")
    private String responseFile;

    // overrides
    @Override
    public String toString() {
        return "";
    }
}
