package com.example.nerve;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

import java.util.TimeZone;

@ServletComponentScan
@SpringBootApplication
public class NerveApplication {

    public static void main(String[] args) {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));

        SpringApplication application =
                new SpringApplication(NerveApplication.class);
        application.setAdditionalProfiles("h2db");
        application.run(args);
//        SpringApplication.run(NerveApplication.class, args);
    }

}
