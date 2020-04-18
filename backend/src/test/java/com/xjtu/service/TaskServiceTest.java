package com.xjtu.service;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;
import static org.mockito.ArgumentMatchers.any;
import static org.junit.jupiter.api.Assertions.*;

import com.xjtu.bean.Task;
import com.xjtu.store.TaskStore;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TaskServiceTest {
    @Mock
    private TaskStore taskStore;

    @InjectMocks
    private TaskService taskService = new TaskService();

    private ArrayList<Task> tasks;

    @Before
    public void setUp() {
        tasks = new ArrayList<>();
    }
    
    @Test
    public void shouldGetAllTasks() {
        when(taskStore.readTasks()).thenReturn(tasks);

        List<Task> all = taskService.getAll();
        
        assertEquals(tasks, all);
    }

    @Test
    public void shouldCreateTask(){
    	when(taskStore.readTasks()).thenReturn(tasks);
    	
    	Task task = taskService.createTask(new Task(3L, "new"));
    	assertNotNull(task.getUpdatedAt());
    	verify(taskStore).writeTasks(any());
    }
}