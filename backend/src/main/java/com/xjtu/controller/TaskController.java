package com.xjtu.controller;

import com.xjtu.bean.Task;
import com.xjtu.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping( "/api/tasks" )
public class
TaskController {
    @Autowired
    public TaskService taskService;

    @GetMapping(produces = "application/json")
    public List<Task> list() {
        return taskService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> find(@PathVariable Long id) {
        return ResponseEntity.of(taskService.find(id));
    }
    
    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<Task> create(@RequestBody Task task){
    	taskService.createTask(task);
    	URI location = ServletUriComponentsBuilder.fromCurrentRequest()
    				.path("/{id}")
    				.buildAndExpand(task.getId())
    				.toUri();
    	return ResponseEntity.created(location).build();
    }
}
