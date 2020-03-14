package com.example.nerve.web.controllers;

import com.example.nerve.model.Constants;
import com.example.nerve.model.entity.Streak;
import com.example.nerve.service.interfaces.iChalResponseService;
import com.example.nerve.service.interfaces.iStreakService;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping(path = "/test", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class mRestController {
    private final iStreakService streakService;
    private final iChalResponseService responseService;

    public mRestController(iStreakService service, iChalResponseService responseService) {
        this.streakService = service;
        this.responseService = responseService;
    }

    @PostMapping(value = "/streaks", params = {"id1", "id2"})
    public Streak beginStreak(@RequestParam Long id1, @RequestParam Long id2) {
        return streakService.setStreak(id1, id2);
    }

  /*  @GetMapping(value = "/video")
    public String getVideo(String path) throws IOException {
        //File f = new File(Constants.fileBasePath + "/responseFiles/image/_1_1_2020_03_12_00_50_25_712_01_00.png");
        //return Files.readAllBytes(f.toPath());
        return Constants.fileDetails(path);
    }*/
}
