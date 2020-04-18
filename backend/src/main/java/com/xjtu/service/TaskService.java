package com.xjtu.service;

import com.xjtu.bean.Task;
import com.xjtu.store.TaskStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskService {
    @Autowired
    public TaskStore store;

    public List<Task> getAll() {
        return store.readTasks();
    }
    
    public Task createTask(Task task){
    	List<Task> tasks = new ArrayList<>(store.readTasks());
    	task.setUpdatedAt();
    	tasks.add(task);
    	store.writeTasks(tasks);
    	return task;
    }
}
