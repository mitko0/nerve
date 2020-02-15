package com.example.nerve.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.Set;

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
    private String username;

    @Email(message = "Invalid email")
    private String email;

    @Length(min = 4, message = "Password is too short!")
    private String password;

    private long points;

    private byte[] img;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "authorities",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

    @JsonIgnore
    @OneToMany(mappedBy = "sender")
    private Set<Challenge> challengesTo;

    @JsonIgnore
    @OneToMany(mappedBy = "receiver")
    private Set<Challenge> challengesFrom;

    @JsonIgnore
    @OneToMany(mappedBy = "sender")
    private Set<ChalResponse> responsesTo;

    @JsonIgnore
    @OneToMany(mappedBy = "receiver")
    private Set<ChalResponse> responsesFrom;

    @JsonIgnore
    @OneToMany(mappedBy = "user1")
    private Set<Streak> u1;

    @JsonIgnore
    @OneToMany(mappedBy = "user2")
    private Set<Streak> u2;
}
