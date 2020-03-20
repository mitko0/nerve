package com.example.nerve.repository.interfaces;

import com.example.nerve.model.entity.Role;
import com.example.nerve.model.entity.User;

import java.util.List;
import java.util.Optional;

public interface iRoleRepository {
    Role save(Role role);

    Optional<Role> findById(int id);

    Optional<Role> findByName(String name);

    List<Role> allRoles();

    List<User> findUsersWithRole(Role role);

    List<User> findUsersWithoutRole(Role role);

    void deleteById(int id);

    void deleteByName(String name);

    List<Role> search(String name);
}
