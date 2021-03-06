package com.example.nerve.web.rest;

import com.example.nerve.model.entity.Role;
import com.example.nerve.model.entity.User;
import com.example.nerve.service.interfaces.iRoleService;
import org.springframework.http.HttpStatus;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/roles", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class RoleApi {
    private final iRoleService service;

    public RoleApi(iRoleService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Role newRole(@ModelAttribute @Valid Role role,
                        HttpServletResponse response,
                        UriComponentsBuilder builder) {

        response.setHeader("Location", builder.path("/api/roles?name={roleName}")
                .buildAndExpand(role.getRoleName()).toUriString());
        return service.createRole(role);
    }

    @GetMapping
    public Role getRole(@RequestParam(value = "id", required = false) Integer id,
                        @RequestParam(value = "role-name", required = false) String name) {

        return service.getRole(Optional.ofNullable(id), Optional.ofNullable(name));
    }

    @GetMapping("/all")
    public List<Role> allRoles() {
        return service.allRoles();
    }

    @GetMapping(params = "name")
    public List<Role> search(@RequestParam String name) {
        return service.search(name);
    }

    @GetMapping(value = "/{name}/users")
    public List<User> usersWithRole(@PathVariable String name) {
        return service.usersWithRole(name);
    }

    @GetMapping(value = "/{name}/no")
    public List<User> usersWithoutRole(@PathVariable String name) {
        return service.usersWithoutRole(name);
    }

    @DeleteMapping
    public void deleteRole(@RequestParam(value = "id", required = false) Integer id,
                           @RequestParam(value = "role-name", required = false) String name) {

        service.deleteRole(Optional.ofNullable(id), Optional.ofNullable(name));
    }

    @PostMapping(value = "/promote-users")
    public List<User> addRoleToUser(@RequestParam(value = "role-id") Integer roleId,
                                    @RequestParam(value = "user-ids") List<Long> userIds) {

        return service.addRoleToUsers(roleId, userIds);
    }

    @PostMapping(value = "/demote-users")
    public void removeUserFromRole(@RequestParam(value = "role-id") Integer roleId,
                                   @RequestParam(value = "user-ids") List<Long> userIds) {

        service.removeUsersFromRole(userIds, roleId);
    }
}
