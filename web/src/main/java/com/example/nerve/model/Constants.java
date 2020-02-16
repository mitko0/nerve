package com.example.nerve.model;

import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import static java.nio.file.StandardCopyOption.*;

import java.io.IOException;
import java.nio.file.*;
import java.util.Objects;

public class Constants {
    public static final Long publicChallenge = -1L;
    public static final String profileImageFolder = "/profilePics";
    public static final String defaultProfilePicture = "default.jpg";
    public static final String fileBasePath = System.getProperty("user.dir") + "/web/src/main/resources/static";


    public static String saveFile(MultipartFile file, String username, String location) {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        fileName = username + fileExtension(fileName);

        Path path = Paths.get(Constants.fileBasePath + location, fileName);
        try {
            //Files.write(path, file.getBytes());
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return String.format("%s/%s", location, fileName);
    }

    public static String renameFile(String file, String newName, String location) throws IOException {
        newName = newName + fileExtension(file);
        Files.move(Paths.get(fileBasePath, file), Paths.get(fileBasePath, location, newName), REPLACE_EXISTING);
        return String.format("%s/%s", profileImageFolder, newName);
    }

    public static String fileExtension(String name) {
        int ext = name.lastIndexOf(".");
        return name.substring(ext);
    }
}
