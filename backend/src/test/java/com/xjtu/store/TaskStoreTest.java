package com.xjtu.store;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.junit.Test;
import org.junit.jupiter.api.AfterEach;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.xjtu.bean.Task;


@RunWith(SpringRunner.class)
@SpringBootTest
public class TaskStoreTest {
    @Autowired
    private TaskStore taskStore;


    @Test
    public void shouldReadTasks() {
        List<Task> tasks = taskStore.readTasks();
        assertEquals(2, tasks.size());
        assertEquals(1L, tasks.get(0).getId());
        assertEquals("test1L", tasks.get(0).getContent());
//        assertEquals(LocalDateTime.of(2020, 4, 17, 10, 01, 11), tasks.get(0).getUpdatedAt());
    }

    @Test
    public void shouldWriteTasks(){
    	List<Task> tasksInStore = taskStore.readTasks();
    	List<Task> tasks = Arrays.asList(createTask(1L, "test1L"), createTask(2L, "test2L"));
    	taskStore.writeTasks(tasks);
    	
    	
    	assertEquals(2, tasksInStore.size());
    	assertNotNull(tasksInStore.get(1).getUpdatedAt());
    	assertEquals("test2L", tasksInStore.get(1).getContent());
    }

    private Task createTask(long l, String test) {
        Task task = new Task(l, test);
        task.setUpdatedAt();
        return task;
    }
}
