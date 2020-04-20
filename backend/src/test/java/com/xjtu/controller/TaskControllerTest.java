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
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
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
	public void shouldFindTaskByIdIfPresent() throws Exception {
		when(service.find(3L)).thenReturn(Optional.of(new Task(3L, "X")));
		this.mockMvc.perform(get("/api/tasks/3")).andDo(print()).andExpect(status().isOk())
				.andExpect(jsonPath("$.content").value("X"));
	}
	
	@Test
    public void shouldReturnNotFoundWhenFindByIdIfNotPresent() throws Exception {
        when(service.find(3L)).thenReturn(Optional.empty());
        this.mockMvc.perform(get("/api/tasks/3")).andDo(print()).andExpect(status().isNotFound());
    }
	
	@Test
	public void shouldCreateTask() throws Exception{
		Task task = new Task(1L, "new");
		Task createTask = new Task(1L, "new");
		when(service.createTask(task)).thenReturn(createTask);
		this.mockMvc.perform(post("/api/tasks").contentType(MediaType.APPLICATION_JSON).content(new Gson().toJson(task)))
			.andDo(print()).andExpect(status().isCreated());
	}
	
	@Test
	public void shouldUpdateTaskById() throws Exception{
		Task task = new Task(1L, "task");
		Task update = new Task(1L, "update");
		when(service.update(any())).thenReturn(Optional.of(update));
		
		this.mockMvc.perform(put("/api/tasks/1").contentType(MediaType.APPLICATION_JSON).content(new Gson().toJson(task)))
					.andDo(print()).andExpect(status().isOk())
					.andExpect(jsonPath("$.content").value("update"));
			
	}
	
	@Test
	public void shouldReturnNotFoundWhenUpdateTaskButDoesNotExist() throws Exception{
		Task task = new Task(1L, "task");
		when(service.update(any())).thenReturn(Optional.empty());
		this.mockMvc.perform(put("/api/tasks/1").contentType(MediaType.APPLICATION_JSON).content(new Gson().toJson(task)))
					.andDo(print()).andExpect(status().isNotFound());
	}
}
