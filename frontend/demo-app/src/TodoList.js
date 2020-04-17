import React, { Component } from 'react';
import ListItem from './ListItem';
import Dialog from './Dialog';
import './main.css';

class TodoList extends Component {
	constructor (props) {
		super(props);

		this.state = {
			list: [{
				id: 0,
				name: '找个日常实习',
				status: 0
			}, {
				id: 1,
				name: '待到明年1月',
				status: 0
			}, {
				id: 2,
				name: '再来看看春招',
				status : 0
			}],
			finished: 0
		};
	}

	addTask (newitem) {
		var allTask = this.state.list;
		allTask.push(newitem);
		this.setState({
			list: allTask
		});
	}

	updateFinished (todoItem) {
		var sum = 0;
		this.state.list.forEach( (item) => {
			if (item.id === todoItem.id) {
				item.status = todoItem.status;
			}
			if (item.status === 1) {
				sum++;
			}
		});
		this.setState({
			finished: sum
		});
	}

	updateTotal (todoItem) {
		var obj = [], sum = 0;
		this.state.list.forEach((item) => {
			if (item.id !== todoItem.id) {
				obj.push(item);
				if (item.status === 1 ) {
					sum++;
				}
			}
		});
		this.setState({
			list: obj,
			finished: sum
		});
	}

	render () {
		return (
			<div className="container">
				<h1>TodoList</h1>
				<ul>
					{ this.state.list.map ((item, index) =>
						<ListItem 
							item={item}  
							finishedChange={this.updateFinished.bind(this)} 
							totalChange={this.updateTotal.bind(this)}
							key={index}
						/>
					)}
				</ul>
				<Dialog addNewTask={this.addTask.bind(this)} nums={this.state.list.length}/>
			</div>
		);
	}
}

export default TodoList;