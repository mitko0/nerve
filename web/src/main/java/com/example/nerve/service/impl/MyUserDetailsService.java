package com.example.nerve.service.impl;

import com.example.nerve.model.*;
import com.example.nerve.model.User;
import com.example.nerve.repository.interfaces.JpaUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private JpaUserRepository repo;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = repo.findByUsername(s);
        if (user == null) {
            throw new UsernameNotFoundException(s);
        }
        return new MyUserPrincipal(user);
    }
}
