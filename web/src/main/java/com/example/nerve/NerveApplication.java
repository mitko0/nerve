package com.example.nerve;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@ServletComponentScan
@SpringBootApplication
public class NerveApplication {

    public static void main(String[] args) {
        SpringApplication.run(NerveApplication.class, args);
    }

}
