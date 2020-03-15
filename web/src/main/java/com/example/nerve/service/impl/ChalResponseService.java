package com.example.nerve.service.impl;

import com.example.nerve.model.Constants;
import com.example.nerve.model.composite_key.ChallengeKey;
import com.example.nerve.model.entity.ChalResponse;
import com.example.nerve.model.entity.Challenge;
import com.example.nerve.model.entity.User;
import com.example.nerve.model.view_model.DataHolder;
import com.example.nerve.repository.interfaces.iChalResponseRepository;
import com.example.nerve.repository.interfaces.iChallengeRepository;
import com.example.nerve.repository.interfaces.iUserRepository;
import com.example.nerve.service.interfaces.iChalResponseService;
import com.example.nerve.service.interfaces.iStreakService;
import org.joda.time.DateTime;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ChalResponseService implements iChalResponseService {

    private final iChalResponseRepository repo;
    private final iChallengeRepository chalRepo;
    private final iUserRepository userRepo;
    private final iStreakService streakService;

    public ChalResponseService(iChalResponseRepository repo, iChallengeRepository chalRepo, iUserRepository userRepo, iStreakService streakService) {
        this.repo = repo;
        this.chalRepo = chalRepo;
        this.userRepo = userRepo;
        this.streakService = streakService;
    }

    @Override
    public ChalResponse createResponse(Date challengeDate, ChalResponse response, MultipartFile file, Optional<Long> responderId) {
        DateTime nowDT = new DateTime();
        DateTime challengeDateDT = new DateTime(challengeDate);

        long responseSenderId = response.getId().getSenderId();
        long responseReceiverId = response.getId().getReceiverId();

        User responseUser;

        //db time bug x11x2
        //ChallengeKey challengeKey = new ChallengeKey(responseReceiverId, responseSenderId, challengeDateDT.plusHours(1).toDate());
        ChallengeKey challengeKey = new ChallengeKey(responseReceiverId, responseSenderId, challengeDateDT.toDate());
        Challenge challenge = chalRepo.findById(challengeKey).orElseThrow(() -> new RuntimeException("m:: Invalid challenge!"));
        //response.getId().setCreateDate(nowDT.plusHours(1).toDate());
        response.getId().setCreateDate(nowDT.toDate());
        //response.setChallengeDate(challengeDateDT.plusHours(1).toDate());
        response.setChallengeDate(challengeDateDT.toDate());

        if (!challenge.isResponded()) {
            if (responseSenderId == Constants.publicChallenge) {
                Long val = responderId.orElseThrow(() -> new RuntimeException("m:: Invalid id!"));
                responseUser = userRepo.findById(val).orElseThrow(() -> new RuntimeException("m:: User not found!"));
                responseUser.setPoints(responseUser.getPoints() + Constants.points);
                response.setPublicResponder(val);
                userRepo.save(responseUser);
            }
            else {
                DateTime longDT = new DateTime().plusYears(1);
                challenge.setEndDate(longDT.toDate());
                challenge.setResponded(true);
                chalRepo.save(challenge);
                streakService.setStreak(responseSenderId, responseReceiverId);
            }

            if (file != null
                    && !file.getContentType().startsWith("image")
                    && !file.getContentType().startsWith("video"))
                throw new RuntimeException("m:: Type is not allowed");

            String saveLocation = Constants.responseFilesFolder + "/video";
            if (file.getContentType().startsWith("image"))
                saveLocation = Constants.responseFilesFolder + "/image";

            String createDateS = nowDT.toString();

            String name = String.format("%d_%d_%s",
                    response.getId().getSenderId(),
                    response.getId().getReceiverId(),
                    createDateS);
            name = name.replaceAll("[^0-9]", "_");

            try {
                String location = Constants.saveFile(file, name, saveLocation);
                response.setResponseFilePath(location);
            } catch (Exception e) {
                e.printStackTrace();
            }
            return repo.save(response);
        }
        throw new RuntimeException("m:: Already done!");
    }

    @Override
    public ChalResponse rateResponse(ChallengeKey key, short rating) {
        rating = (short)(Math.abs(rating) % 6);
        //db time bug
        //DateTime dt = new DateTime(key.getCreateDate()).plusHours(1);
        DateTime dt = new DateTime(key.getCreateDate());
        key.setCreateDate(dt.toDate());

        ChalResponse response = repo.findById(key).orElseThrow();
        response.setRating(rating);

        return repo.save(response);
    }

    @Override
    public ChalResponse getById(ChallengeKey key) {
        //db time bug
        //DateTime dt = new DateTime(key.getCreateDate()).plusHours(1);
        DateTime dt = new DateTime(key.getCreateDate());
        key.setCreateDate(dt.toDate());
        return repo.findById(key).orElseThrow();
    }

    @Override
    public List<ChalResponse> getByChallengeId(Long senderId, Long receiverId, Date challengeDate) {
        //db time bug
        //DateTime dt = new DateTime(challengeDate).plusHours(1);
        DateTime dt = new DateTime(challengeDate);

        return repo.findByChallengeId(senderId, receiverId, dt.toDate());
    }

    @Override
    public List<DataHolder<ChalResponse, User>> getWithUserByChallengeId(Long senderId, Long receiverId, Date challengeDate) {
        //db time bug
        //DateTime dt = new DateTime(challengeDate).plusHours(1);
        DateTime dt = new DateTime(challengeDate);

        return repo.findWithUserByChallengeId(senderId, receiverId, dt.toDate());
    }

    @Override
    public void deleteById(ChallengeKey key) {
        //db time bug
        //DateTime dt = new DateTime(key.getCreateDate()).plusHours(1);
        //key.setCreateDate(dt.toDate());
        repo.deleteById(key);
    }

    @Override
    public void deletePublic(Long responderId, Long receiverId, Date createDate) {
        //db time bug
        //DateTime dt = new DateTime(createDate).plusHours(1);
        DateTime dt = new DateTime(createDate);
        repo.deletePublic(responderId, receiverId, dt.toDate());
    }
}
