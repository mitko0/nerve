package com.example.nerve.model.view_model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileResponse<T> implements Serializable {
    private T entity;
    private InputStreamResource resource;
    private ByteArrayResource bytes;
}
