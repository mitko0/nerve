package com.example.nerve;

import com.example.nerve.model.Constants;
import com.example.nerve.web.rest.UserApi;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.io.File;

@ServletComponentScan
@SpringBootApplication
public class NerveApplication {

    public static void main(String[] args) {
        SpringApplication.run(NerveApplication.class, args);
    }

}
