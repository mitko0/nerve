package com.example.nerve.model;

import com.example.nerve.model.view_model.FileDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import org.jetbrains.annotations.NotNull;

import static java.nio.file.StandardCopyOption.*;

import java.io.File;
import java.io.IOException;
import java.net.URLConnection;
import java.nio.file.*;
import java.util.Base64;
import java.util.Objects;

@Component
public class Constants {
    public static final long points = 10;
    public static final long publicChallenge = -1;
    public static final String profileImageFolder = "/profilePics";
    public static final String responseFilesFolder = "/responseFiles";
    public static final String defaultProfilePicture = "default.jpg";
    public static final String fileBasePath = System.getProperty("user.dir") + "/web/src/main/resources/static";

    @Autowired
    public static SimpMessagingTemplate messagingTemplate;

    public static String saveFile(@NotNull MultipartFile file, String name, String location) throws IOException {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        fileName = name + fileExtension(fileName);

        Path path = Paths.get(Constants.fileBasePath + location, fileName);
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

        return String.format("%s/%s", location, fileName);
    }

    public static String renameFile(String fileLocation, String newName, String location) throws IOException {
        newName = newName.concat(fileExtension(fileLocation));
        Files.move(Paths.get(fileBasePath, fileLocation), Paths.get(fileBasePath, location, newName), REPLACE_EXISTING);
        return String.format("%s/%s", profileImageFolder, newName);
    }

    public static void deleteFile(String fileLocation) throws IOException {
        if (!fileLocation.contains(defaultProfilePicture))
            Files.delete(Paths.get(fileBasePath, fileLocation));
    }

    public static String fileExtension(String name) {
        int ext = name.lastIndexOf(".");
        return name.substring(ext);
    }

    public static FileDetails fileDetails(String filePath) throws IOException {
        File file = new File(Constants.fileBasePath + filePath);

        FileDetails details = new FileDetails();
        details.setBase64(Base64.getEncoder().encodeToString(Files.readAllBytes(file.toPath())));
        details.setFormat(fileExtension(filePath));
        details.setMimeType(URLConnection.guessContentTypeFromName(file.getName()));

        return details;
    }
}
