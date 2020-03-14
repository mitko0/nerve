package com.example.nerve.model.entity;

import com.example.nerve.model.Constants;
import com.example.nerve.model.view_model.FileDetails;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import java.io.IOException;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    @Pattern(regexp = "^[a-zA-Z0-9.!=_]{4,}$")
    private String username;

    @Email(message = "Invalid email")
    private String email;

    @Column(nullable = false)
    @Length(min = 4, message = "Password is too short!")
    private String password;

    @Column(columnDefinition = "bigint default 0")
    private long points;

    @Column(name = "profile_picture")
    private String profilePicLocation;

    @Transient
    private FileDetails fileDetails;

    @ManyToOne
    @NotFound(action = NotFoundAction.IGNORE)
    private Role role;

    @JsonIgnore
    @OneToMany(mappedBy = "sender")
    @NotFound(action = NotFoundAction.IGNORE)
    private List<Challenge> challengesTo;

    @JsonIgnore
    @OneToMany(mappedBy = "receiver")
    @NotFound(action = NotFoundAction.IGNORE)
    private List<Challenge> challengesFrom;

    @JsonIgnore
    @OneToMany(mappedBy = "sender")
    @NotFound(action = NotFoundAction.IGNORE)
    private List<ChalResponse> responsesTo;

    @JsonIgnore
    @OneToMany(mappedBy = "receiver")
    @NotFound(action = NotFoundAction.IGNORE)
    private List<ChalResponse> responsesFrom;

    @JsonIgnore
    @OneToMany(mappedBy = "user1")
    @NotFound(action = NotFoundAction.IGNORE)
    private List<Streak> u1;

    @JsonIgnore
    @OneToMany(mappedBy = "user2")
    @NotFound(action = NotFoundAction.IGNORE)
    private List<Streak> u2;

    @Override
    public String toString() {
        return "";
    }

    public void challenge(Challenge challenge) {
        this.challengesTo.add(challenge);
        challenge.setSender(this);
    }

    public void acceptChallenge(Challenge challenge) {
        this.challengesFrom.add(challenge);
        challenge.setReceiver(this);
    }

    @PostLoad
    @PostPersist
    @PostUpdate
    public void updateFileDetails() throws IOException {
        fileDetails = Constants.fileDetails(this.profilePicLocation);
    }
}
