package com.example.nerve.model.exception;

import org.springframework.security.authentication.BadCredentialsException;

public class BadCredentials extends BadCredentialsException {
    public BadCredentials(String msg) {
        super(msg);
    }
}
