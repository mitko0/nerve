package com.example.nerve.model.entity;

import com.example.nerve.model.composite_key.StreakKey;
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
@Table(name = "streaks")
public class Streak {

    @EmbeddedId
    private StreakKey id = new StreakKey();

    @JsonIgnore
    @ManyToOne
    @NotFound(action = NotFoundAction.IGNORE)
    @MapsId("user1_id")
    @JoinColumn(name = "user1_id")
    private User user1;

    @JsonIgnore
    @ManyToOne
    @NotFound(action = NotFoundAction.IGNORE)
    @MapsId("user2_id")
    @JoinColumn(name = "user2_id")
    private User user2;

    @Column(name = "streak")
    private int streak;

    @Column(name = "expiration_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date expirationDate;

    @Column(name = "update_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDate;

    // overrides
    @Override
    public String toString() {
        return "";
    }
}
