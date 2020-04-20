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
            {/*{!this.state.showInput ?*/}
            {/*    <div className="change-input">*/}
            {/*        /!*<span onClick={this.handleFinished} id={item.id} className="check-btn"*!/*/}
            {/*        /!*	style={{backgroundColor: item.status === 0 ? '#fff' : '#A1EAFB'}}*!/*/}
            {/*        /!*></span>*!/*/}
            {/*        <span className="name">{item.content}</span>*/}
            {/*        <span className="update-btn" onClick={this.handleChangeClick}>修改</span>*/}
            {/*        <span className="delete-btn" onClick={this.handleDelete}>删除</span>*/}
            {/*    </div>*/}
            {/*    :*/}
            {/*    <div className="write-input">*/}
            {/*        <div className="write-input-name">*/}
            {/*            <input placeholder="请输入"*/}
            {/*                   defaultValue={this.props.value === '-' ? '' : this.props.value}*/}
            {/*                   onChange={this.handleChange}*/}
            {/*                   style={{height: '25px', margin: '0'}}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <div className="write-input-hide">*/}
            {/*            <span className="write-input-hide-yes" onClick={this.handleAffirmClick}>Y</span>*/}
            {/*            <span>/</span>*/}
            {/*            <span className="write-input-hide-no" onClick={this.handleCloseClick}>N</span>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*}*/}

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