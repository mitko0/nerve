package com.example.nerve.repository.jpa;

import com.example.nerve.model.entity.Role;
import com.example.nerve.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface JpaRoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByRoleName(String name);

    @Query("select u from Role r inner join r.users u on(r.id=u.role.id) where r=:role")
    List<User> findUsersWithRole(Role role);

    void deleteByRoleName(String name);

    @Query("select r from Role r where r.roleName like %:name%")
    List<Role> search(String name);
}
