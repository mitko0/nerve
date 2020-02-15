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
@Table(name = "streaks")
public class Streak {

    @EmbeddedId
    private StreakKey id = new StreakKey();

    @JsonIgnore
    @ManyToOne
    @MapsId("user1_id")
    @JoinColumn(name = "user1_id")
    private User user1;

    @JsonIgnore
    @ManyToOne
    @MapsId("user2_id")
    @JoinColumn(name = "user2_id")
    private User user2;

    @Column(name = "streak")
    private int streak;
}
