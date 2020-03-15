package com.example.nerve.model.view_model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DataHolder<T, V> {
    private T attr1;
    private V attr2;
}
