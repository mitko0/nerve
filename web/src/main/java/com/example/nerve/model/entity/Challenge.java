package com.example.nerve.model.entity;

import com.example.nerve.model.composite_key.ChallengeKey;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "challenges")
public class Challenge {
    @EmbeddedId
    private ChallengeKey id = new ChallengeKey();

    @JsonIgnore
    @ManyToOne
    @NotFound(action = NotFoundAction.IGNORE)
    @MapsId("sender_id")
    @JoinColumn(name = "sender_id", insertable = false, updatable = false)
    private User sender;

    @JsonIgnore
    @ManyToOne
    @NotFound(action = NotFoundAction.IGNORE)
    @MapsId("receiver_id")
    @JoinColumn(name = "receiver_id", columnDefinition = "bigint default -1", insertable = false, updatable = false)
    private User receiver;

    @Column(name = "end_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date endDate;

    @Column(name = "description_")
    private String description;

    @Column(columnDefinition = "boolean default false")
    private boolean responded;

    // version i responses

    @Override
    public String toString() {
        return "";
    }
}
