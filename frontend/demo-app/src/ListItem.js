import React, {Component, useState} from 'react';

const ListItem = ({item, itemDelete, itemUpdate}) => {
    const [isEditable, setIsEditable] = useState(false);
    const [todoItem, setTodoItem] = useState(item);


    const unfinish = {
        backgroundColor: '#DFFCB5',
        color: '#2EB872',
    };

    var itemStyle = unfinish;

    return (
        <li className="task-item" id={"task-item-" + todoItem.id} style={itemStyle}>
            <input
                value={todoItem.content}
                disabled={!isEditable}
                onChange={(e) => setTodoItem({ ...item, content: e.target.value })}
                onBlur={() => {
                    itemUpdate(todoItem);
                    setIsEditable(false);
                }}
            />
            <span className="update-btn" onClick={() => setIsEditable(!isEditable)}>修改</span>
            <span className="delete-btn" onClick={() => itemDelete(item.id)}>删除</span>


        </li>
    );
};

export default ListItem;