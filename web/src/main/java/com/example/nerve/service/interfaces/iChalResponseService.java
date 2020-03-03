package com.example.nerve.service.interfaces;

import com.example.nerve.model.composite_key.ChallengeKey;
import com.example.nerve.model.entity.ChalResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface iChalResponseService {

    ChalResponse createResponse(Date challengeDate, ChalResponse response, MultipartFile file, Optional<Long> responderID);

    ChalResponse getById(ChallengeKey key);

    List<ChalResponse> getByChallengeId(Long senderId, Long receiverId, Date challengeDate);

    void deleteById(ChallengeKey key);

    void deletePublic(Long responderId, Long receiverId, Date createDate);
}
