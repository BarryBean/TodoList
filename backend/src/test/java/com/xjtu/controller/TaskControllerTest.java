package com.xjtu.controller;

import com.xjtu.bean.Task;
import com.xjtu.service.TaskService;

import com.google.gson.Gson;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(TaskController.class)
public class TaskControllerTest {
	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private TaskService service;
	
	private List<Task> tasks = new ArrayList<Task>();
	
	@Before
	public void setUp(){
		tasks.add(new Task(1L, "a"));
	}
	
	@Test
    public void shouldGetAll() throws Exception {
        when(service.getAll()).thenReturn(tasks);
        System.out.println(tasks.size());
        this.mockMvc.perform(get("/api/tasks")).andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$[0].content").value("a"));
    }
	
	@Test
	public void shouldCreateTask() throws Exception{
		Task task = new Task(1L, "new");
		Task createTask = new Task(1L, "new");
		when(service.createTask(task)).thenReturn(createTask);
		this.mockMvc.perform(post("/api/tasks").contentType(MediaType.APPLICATION_JSON).content(new Gson().toJson(task)))
			.andDo(print()).andExpect(status().isCreated());
	}
}
