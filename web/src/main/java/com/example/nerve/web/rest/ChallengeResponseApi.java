package com.example.nerve.web.rest;

import com.example.nerve.model.composite_key.ChallengeKey;
import com.example.nerve.model.entity.ChalResponse;
import com.example.nerve.service.interfaces.iChalResponseService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/responses", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class ChallengeResponseApi {

    private final iChalResponseService responseService;

    public ChallengeResponseApi(iChalResponseService responseService) {
        this.responseService = responseService;
    }

    @PostMapping
    public ChalResponse newResponse(@ModelAttribute @Valid ChalResponse response,
                                    @RequestParam
                                    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSSSSS", iso = DateTimeFormat.ISO.DATE_TIME) Date challengedDate,
                                    @RequestParam(value = "media") MultipartFile file,
                                    @RequestParam(required = false) Long responderId) {

        return responseService.createResponse(challengedDate, response, file, Optional.ofNullable(responderId));
    }

    @PatchMapping("/rate")
    public ChalResponse rateResponse(@RequestParam short rating,
                                     @RequestParam Long senderId,
                                     @RequestParam Long receiverId,
                                     @RequestParam
                                     @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSSSSS", iso = DateTimeFormat.ISO.DATE_TIME) Date createDate) {

        ChallengeKey key = new ChallengeKey(senderId, receiverId, createDate);
        return responseService.rateResponse(key, rating);
    }

    @GetMapping
    public ChalResponse getResponse(@RequestParam Long senderId,
                                    @RequestParam Long receiverId,
                                    @RequestParam
                                    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSSSSS", iso = DateTimeFormat.ISO.DATE_TIME) Date createDate) {

        ChallengeKey key = new ChallengeKey(senderId, receiverId, createDate);
        return responseService.getById(key);
    }

    @GetMapping("/challenge")
    public List<ChalResponse> getResponseForChallenge(@RequestParam Long senderId,
                                                      @RequestParam Long receiverId,
                                                      @RequestParam
                                                      @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSSSSS", iso = DateTimeFormat.ISO.DATE_TIME) Date challengeDate) {

        return responseService.getByChallengeId(senderId, receiverId, challengeDate);
    }

    @DeleteMapping
    public void deleteResponse(@RequestParam Long senderId,
                               @RequestParam Long receiverId,
                               @RequestParam
                               @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSSSSS", iso = DateTimeFormat.ISO.DATE_TIME) Date createDate) {

        ChallengeKey key = new ChallengeKey(senderId, receiverId, createDate);
        responseService.deleteById(key);
    }

    @DeleteMapping("/public")
    public void deletePublic(@RequestParam Long responderId,
                             @RequestParam Long receiverId,
                             @RequestParam
                             @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSSSSS", iso = DateTimeFormat.ISO.DATE_TIME) Date createDate) {

        responseService.deletePublic(responderId, receiverId, createDate);
    }

}
