package com.example.nerve.service.interfaces;

import com.example.nerve.model.entity.Role;
import com.example.nerve.model.entity.User;

import java.util.List;
import java.util.Optional;

public interface iRoleService {
    Role createRole(Role role);

    Role getRole(Optional<Integer> id, Optional<String> name);

    List<Role> allRoles();

    List<Role> search(String name);

    List<User> usersWithRole(String name);

    void deleteRole(Optional<Integer> id, Optional<String> name);

    User addRoleToUser(Integer roleId, Long userId);

    void removeUserFromRole(Long userId, Integer roleId);
}
