package com.xjtu.bean;


import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
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
    
    public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt() {
		this.updatedAt = LocalDateTime.now();
	}

}
