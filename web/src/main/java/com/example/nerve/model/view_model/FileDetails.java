package com.example.nerve.model.view_model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileDetails {
    private String base64;
    private String mimeType;
    private String format;
}
