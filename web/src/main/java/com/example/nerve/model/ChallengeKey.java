package com.example.nerve.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class ChallengeKey implements Serializable {
    @Column(name = "sender_id")
    private Long senderId;

    @Column(name = "receiver_id")
    private Long receiverId;

    @Column(name = "date_created")
    @CreationTimestamp
    private Timestamp dateCreated;

    @Override
    public boolean equals(Object o) {
        if (o == this) {
            return true;
        }

        if (!(o instanceof ChallengeKey)) {
            return false;
        }
        ChallengeKey obj = (ChallengeKey)o;

        return obj.dateCreated == this.dateCreated
                && obj.senderId.equals(this.senderId)
                && obj.receiverId.equals(this.receiverId);
    }
}
