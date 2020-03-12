package com.example.nerve.model;

import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import org.jetbrains.annotations.NotNull;

import static java.nio.file.StandardCopyOption.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.Base64;
import java.util.Objects;

public class Constants {
    public static final long points = 10;
    public static final long publicChallenge = -1;
    public static final String profileImageFolder = "/profilePics";
    public static final String responseFilesFolder = "/responseFiles";
    public static final String defaultProfilePicture = "default.jpg";
    public static final String fileBasePath = System.getProperty("user.dir") + "/web/src/main/resources/static";


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

    public static String fileExtension(String name) {
        int ext = name.lastIndexOf(".");
        return name.substring(ext);
    }

    public static String toBase64(String filePath) throws IOException {
        File file = new File(Constants.fileBasePath + filePath);
        return Base64.getEncoder().encodeToString(Files.readAllBytes(file.toPath()));
    }
}
