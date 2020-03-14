package com.example.nerve.model.entity;

import com.example.nerve.model.Constants;
import com.example.nerve.model.composite_key.ChallengeKey;
import com.example.nerve.model.view_model.FileDetails;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.validator.constraints.Range;

import javax.persistence.*;
import java.io.IOException;
import java.util.Date;

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

    @Column(name = "challenge_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date challengeDate;

    @Column(name = "public_responder")
    private Long publicResponder;

    @Column(columnDefinition = "smallint default 0")
    @Range(max = 5)
    private short rating;

    @Column(name = "response_file")
    private String responseFilePath;

    @Transient
    private FileDetails fileDetails;

    @Override
    public String toString() {
        return "";
    }

    @PostLoad
    @PostPersist
    @PostUpdate
    public void updateFileDetails() throws IOException {
        fileDetails = Constants.fileDetails(this.responseFilePath);
    }
}
