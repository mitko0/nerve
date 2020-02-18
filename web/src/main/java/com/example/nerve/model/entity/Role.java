package com.example.nerve.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

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
    private String roleName;

    @JsonIgnore
    @OneToMany(mappedBy = "role")
    private List<User> users;

    // cascading baby
    @PreRemove
    public void preDelete() {
        users.forEach(user -> user.setRole(null));
    }

    @PostUpdate
    public void postUpdate() {
        users.forEach(user -> user.setRole(this));
    }

    // overrides
    @Override
    public String toString() {
        return "";
    }

    // methods
    public void setRoleToUser(User user) {
        users.add(user);
        user.setRole(this);
    }

    public void removeUser(User user) {
        user.setRole(null);
        users.remove(user);
    }
}
