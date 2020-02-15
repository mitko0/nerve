package com.example.nerve.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class StreakKey implements Serializable {
    @Column(name = "user1_id")
    private Long user1Id;

    @Column(name = "user2_id")
    private Long user2Id;

    @Override
    public boolean equals(Object o) {
        if (o == this) {
            return true;
        }

        if (!(o instanceof StreakKey)) {
            return false;
        }
        StreakKey obj = (StreakKey)o;

        return obj.user1Id.equals(this.user1Id)
                && obj.user2Id.equals(this.user2Id);
    }
}
