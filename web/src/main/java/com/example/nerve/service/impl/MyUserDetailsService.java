package com.example.nerve.service.impl;

import com.example.nerve.model.entity.User;
import com.example.nerve.model.security.MyUserDetails;
import com.example.nerve.repository.interfaces.iUserRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {
    private final iUserRepository userRepo;

    public MyUserDetailsService(iUserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username));
        return new MyUserDetails(user);
    }
}
