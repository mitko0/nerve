package com.example.nerve.web.rest;

import com.example.nerve.model.entity.User;
import com.example.nerve.model.security.AuthenticationResponse;
import com.example.nerve.model.security.MyUserDetails;
import com.example.nerve.model.view_model.DataHolder;
import com.example.nerve.service.interfaces.iUserService;
import com.example.nerve.service.jwt.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/authenticate")
public class AuthenticationApi {

    @Autowired
    private JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final iUserService userService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationApi(AuthenticationManager authenticationManager, @Qualifier("myUserDetailsService") UserDetailsService userDetailsService, iUserService userService) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> createToken(@RequestParam String username,
                                         @RequestParam String password,
                                         @RequestParam(required = false, defaultValue = "false") boolean remember) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        final String jwt = jwtService.generateToken(userDetails, remember);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }

    @PostMapping("/get-user")
    public ResponseEntity<?> createTokenWithUser(@RequestParam String username,
                                                 @RequestParam String password,
                                                 @RequestParam(required = false, defaultValue = "false") boolean remember) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }

        final User user = userService.getUser(Optional.empty(), Optional.ofNullable(username));
        UserDetails userDetails = new MyUserDetails(user);
        final String jwt = jwtService.generateToken(userDetails, remember);

        DataHolder<User, String> response = new DataHolder<>(user, jwt);
        return ResponseEntity.ok(response);
    }
}
