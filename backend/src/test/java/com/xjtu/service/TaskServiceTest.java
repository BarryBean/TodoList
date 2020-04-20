package com.xjtu.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.internal.verification.Times;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;
import static org.mockito.ArgumentMatchers.any;
import static org.junit.jupiter.api.Assertions.*;

import com.jayway.jsonpath.Option;
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

    @Test
    public void shouldFindTask() {
        tasks.add(new Task(1L, "task"));
        when(taskStore.readTasks()).thenReturn(tasks);

        Optional<Task> optionalTask = taskService.find(1L);

        Task task = optionalTask.get();
        assertEquals(1L, task.getId());
        assertEquals("task", task.getContent());
    }
    
    @Test
    public void shouldGetEmptyTask(){
    	when(taskStore.readTasks()).thenReturn(tasks);
    	
    	Optional<Task> optionalTask = taskService.find(1L);
    	
    	assertFalse(optionalTask.isPresent());
    }
    
    @Test
    public void shouldUpdateTask(){
    	tasks.add(new Task(1L, "task"));
    	when(taskStore.readTasks()).thenReturn(tasks);
    	
    	Optional<Task> optionalTask = taskService.update(new Task(1L, "new task"));
    	
    	Task task = optionalTask.get();
    	assertEquals(1L, task.getId());
    	assertEquals("new task", task.getContent());
    	assertNotNull(task.getUpdatedAt());
    	verify(taskStore).writeTasks(any());
    }
    
    @Test
    public void shouldNotUpdateTaskWhenNotExist(){
    	when(taskStore.readTasks()).thenReturn(tasks);
    	
    	Optional<Task> optionalTask = taskService.update(new Task(1L, "update"));
    	assertFalse(optionalTask.isPresent());
    	verify(taskStore, new Times(0)).writeTasks(any());
    }
}