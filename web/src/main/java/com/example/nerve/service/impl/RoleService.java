package com.example.nerve.service.impl;

import com.example.nerve.model.entity.Role;
import com.example.nerve.model.entity.User;
import com.example.nerve.repository.interfaces.iRoleRepository;
import com.example.nerve.repository.interfaces.iUserRepository;
import com.example.nerve.service.interfaces.iRoleService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RoleService implements iRoleService {
    private final iRoleRepository roleRepo;
    private final iUserRepository userRepo;

    public RoleService(iRoleRepository roleRepo, iUserRepository userRepo) {
        this.roleRepo = roleRepo;
        this.userRepo = userRepo;
    }

    @Override
    public Role createRole(Role role) {
        role.setRoleName(role.getRoleName().toUpperCase());
        return roleRepo.save(role);
    }

    @Override
    public Role getRole(Optional<Integer> id, Optional<String> name) {
        if (id.isEmpty() && name.isEmpty())
            throw new RuntimeException("m:: Nothing to search by!");

        final Role[] role = {new Role()};

        id.ifPresent((val) ->
                role[0] = roleRepo.findById(val).orElseThrow(RuntimeException::new));

        name.ifPresent((val) ->
                role[0] = roleRepo.findByName(val).orElseThrow(RuntimeException::new));

        return role[0];
    }

    @Override
    public List<Role> allRoles() {
        return roleRepo.allRoles();
    }

    @Override
    public List<Role> search(String name) {
        return roleRepo.search(name);
    }

    @Override
    public List<User> usersWithRole(String name) {
        Role role = roleRepo.findByName(name).orElseThrow(() -> new RuntimeException("Role doesn't exist!"));
        return roleRepo.findUsersWithRole(role);
    }

    @Override
    public List<User> usersWithoutRole(String name) {
        Role role = roleRepo.findByName(name).orElseThrow(() -> new RuntimeException("Role doesn't exist!"));
        return roleRepo.findUsersWithoutRole(role);
    }

    @Override
    public void deleteRole(Optional<Integer> id, Optional<String> name) {
        if (id.isEmpty() && name.isEmpty())
            throw new RuntimeException("m:: Nothing to search by!");

        id.ifPresent(roleRepo::deleteById);
        name.ifPresent(roleRepo::deleteByName);
    }

    @Override
    public List<User> addRoleToUsers(Integer roleId, List<Long> userIds) {
        Role role = roleRepo.findById(roleId).orElseThrow(() -> new RuntimeException("m:: Role not found !"));

        List<User> users = new ArrayList<>();
        for (long id : userIds) {
            var user = userRepo.findById(id);
            user.ifPresent(users::add);
        }

        role.setRoleToUsers(users);
        roleRepo.save(role);
        return userRepo.saveAll(users);
    }

    @Override
    public void removeUsersFromRole(List<Long> userIds, Integer roleId) {
        Role role = roleRepo.findById(roleId).orElseThrow(() -> new RuntimeException("m:: Role not found !"));
        Role def = roleRepo.findById(0).get();
        List<User> users = new ArrayList<>();
        for (long id : userIds) {
            var user = userRepo.findById(id);
            user.ifPresent(users::add);
        }

        role.removeUsers(users, def);
        roleRepo.save(role);
        userRepo.saveAll(users);
    }
}
