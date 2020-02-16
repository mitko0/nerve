package com.example.nerve.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "challenges")
public class Challenge {
    @EmbeddedId
    private ChallengeKey id = new ChallengeKey();

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    @MapsId("sender_id")
    @JoinColumn(name = "sender_id", insertable = false, updatable = false)
    private User sender;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    @MapsId("receiver_id")
    @JoinColumn(name = "receiver_id", columnDefinition = "bigint default -1", insertable = false, updatable = false)
    private User receiver;

    @Column(name = "date_end")
    private Timestamp dateEnd;

    private String descr;
}
