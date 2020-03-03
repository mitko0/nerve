package com.example.nerve.web.rest;

import com.example.nerve.model.entity.Challenge;
import com.example.nerve.model.view_model.ChallengeUsers;
import com.example.nerve.service.interfaces.iChallengeService;
import org.joda.time.DateTime;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.nio.file.InvalidPathException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/challenges", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class ChallengeApi {
    private final iChallengeService service;

    public ChallengeApi(iChallengeService service) {
        this.service = service;
    }

    @PostMapping
    public Challenge newChallenge(@ModelAttribute Challenge challenge,
                                  @RequestParam(required = false)
                                  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSSSSS", iso = DateTimeFormat.ISO.DATE_TIME) Date endDateTime) {

        challenge.setEndDate(endDateTime);
        return service.saveChallenge(challenge);
    }

    @GetMapping(value = "/search", params = "username")
    public List<ChallengeUsers> search(@RequestParam String username) {
        return service.search(username);
    }

    @GetMapping("/{searchBy}")
    public List<ChallengeUsers> forUser(@PathVariable String searchBy,
                                        @RequestParam(required = false) Long id,
                                        @RequestParam(required = false) String username) {

        switch (searchBy) {
            case "for":
                return service.allForUser(Optional.ofNullable(id), Optional.ofNullable(username));
            case "to":
                return service.allToUser(Optional.ofNullable(id), Optional.ofNullable(username));
            case "by":
                return service.allByUser(Optional.ofNullable(id), Optional.ofNullable(username));
            default:
                throw new InvalidPathException(searchBy, "Invalid value");
        }
    }

    @GetMapping(value = "/{when}", params = "date")
    public List<ChallengeUsers> forUser(@PathVariable String when,
                                        @RequestParam(value = "date") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSSSSS", iso = DateTimeFormat.ISO.DATE_TIME) DateTime date) {

        when = when.toLowerCase();
        switch (when) {
            case "before":
                return service.beforeDate(date);
            case "after":
                return service.afterDate(date);
            default:
                throw new InvalidPathException(when, "m:: Invalid value");
        }
    }

    @PatchMapping
    public Challenge updateChallenge(@ModelAttribute Challenge challenge,
                                     @RequestParam
                                     @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSSSSS", iso = DateTimeFormat.ISO.DATE_TIME) Date createDateTime,
                                     @RequestParam(required = false)
                                     @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSSSSS", iso = DateTimeFormat.ISO.DATE_TIME) Date endDateTime) {

        challenge.setEndDate(endDateTime);
        challenge.getId().setCreateDate(createDateTime);
        return service.updateChallenge(challenge);
    }
}
