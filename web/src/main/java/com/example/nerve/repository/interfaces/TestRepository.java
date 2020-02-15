package com.example.nerve.repository.interfaces;

import com.example.nerve.model.Test;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestRepository extends JpaRepository<Test, Integer> {
}
