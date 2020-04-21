import React, {Component, useEffect, useState, Fragment} from 'react';
import ListItem from './ListItem';
import {getTodos, addTodo, deleteTodo, updateTodo} from "./api/TodoApi";
import './main.css';
import _ from "lodash";

const TodoList = () => {
    const [inputValue, setInputValue] = useState("");
    const [list, setList] = useState(null);
    const [error, setError] = useState("");

    const handleLoadTasks = () => {
        getTodos()
            .then((response) => {
                setList(response);
            })
            .catch((error) => {
                setError("Unable to retrieve todo's");
            });
    };

    const handleAddTask = () => {
        if (inputValue === "") return;

        const newTask = {
            id: _.parseInt(list.length ? list[list.length - 1].id : 0) + 1,
            content: inputValue,
        };

        addTodo(newTask).then(() => {
            setList([...list, newTask]);
            setInputValue("");
        });
    };

    const handleDeleteTask = (id) =>
        deleteTodo(id).then(() => {
            setList(list.filter((item) => item.id !== id));
        });

    const handleUpdateTask = (task) => {
        if (task.content === "") return;

        updateTodo(task).then((response) => {
            setList(
                list.map((x) => (x.id === response.id ? {...x, ...response} : x))
            );
        });
    };

    useEffect(() => {
        handleLoadTasks();
    }, []);

    if (list === null) {
        return <div>Tasks is loading ...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container">
            <h1>TodoList</h1>
            <ul className="task-items">
                {list.map((item) =>
                    <ListItem
                        item={item}
                        key={item.id}
                        index={item.id}
                        itemDelete={handleDeleteTask}
                        itemUpdate={handleUpdateTask}
                        // finishedChange={this.updateFinished.bind(this)}
                        // totalChange={this.updateTotal.bind(this)}
                    />
                )}
            </ul>
            <div className="dialog">
                <div>
                    <h3>添加</h3>
                    <input type="text" className="task-input" value={inputValue}
                           onChange={(e) => setInputValue(e.target.value)} placeholder="请输入"/>
                </div>
                <div>
                    <input type="button" className="submit-button" data-testid="add-button" value="提交" onClick={handleAddTask}/>
                </div>
            </div>
        </div>
    );
};

export default TodoList;