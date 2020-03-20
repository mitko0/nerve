package com.example.nerve.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true, nullable = false, name = "role_name")
    @NotBlank
    private String roleName;

    @JsonIgnore
    @OneToMany(mappedBy = "role")
    private List<User> users;

    @PreRemove
    public void preDelete() {
        users.forEach(user -> user.setRole(null));
    }

    @PostUpdate
    public void postUpdate() {
        users.forEach(user -> user.setRole(this));
    }

    @Override
    public String toString() {
        return "";
    }

    public void setRoleToUsers(List<User> usrs) {
        this.users.addAll(usrs);
        for (var user : usrs)
            user.setRole(this);
    }

    public void removeUsers(List<User> usrs, Role def) {
        for (var user : usrs)
            user.setRole(def);
        this.users.removeAll(usrs);

    }
}
