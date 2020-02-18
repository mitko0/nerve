package com.example.nerve.repository.impl;

import com.example.nerve.model.entity.Role;
import com.example.nerve.model.entity.User;
import com.example.nerve.repository.interfaces.iRoleRepository;
import com.example.nerve.repository.jpa.JpaRoleRepository;
import com.example.nerve.repository.jpa.JpaUserRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class RoleRepository implements iRoleRepository {
    private final JpaRoleRepository repo;


    public RoleRepository(JpaRoleRepository repo) {
        this.repo = repo;
    }

    @Override
    public Role save(Role role) {
        return repo.save(role);
    }

    @Override
    public Optional<Role> findById(int id) {
        return repo.findById(id);
    }

    @Override
    public Optional<Role> findByName(String name) {
        return repo.findByRoleName(name);
    }

    @Override
    public List<Role> allRoles() {
        return repo.findAll();
    }

    @Override
    public List<User> findUsersWithRole(Role role) {
        return repo.findUsersWithRole(role);
    }

    @Override
    public void deleteById(int id) {
        repo.deleteById(id);
    }

    @Override
    public void deleteByName(String name) {
        repo.deleteByRoleName(name);
    }

    @Override
    public List<Role> search(String name) {
        return repo.search(name);
    }
}
