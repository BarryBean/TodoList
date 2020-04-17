package com.xjtu.bean;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Data
public class Task {
    private long id;
    private String content;
    private LocalDateTime updatedAt;

    public Task() {
    }

    public Task(Long id, String content) {
        this.id = id;
        this.content = content;
    }

    public void setUpdatedAt() {
        this.updatedAt = LocalDateTime.now();
    }

}
