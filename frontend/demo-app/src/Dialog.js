import React, { Component } from 'react';

class Dialog extends Component {
	constructor (props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick () {
		var len = this.props.nums;
		var newid = len > 0 ? len : 0;
		var value = this.refs.myText.value;
		if (value !== '') {
			var obj = {
				id: newid,
				name: value,
				status: 0
			};
			this.refs.myText.value = '';
			this.props.addNewTask(obj);
		}
	}

	render () {
		return (
			<div className="dialog">
				<div>
					<h3>添加</h3>
					<input type="text" className="task-input" ref="myText" placeholder="请输入"/>
				</div>
				<div>
					<input type="button" className="add-btn" value="提交" onClick={this.handleClick}/>
				</div>
			</div>
			
		);
	}
}

export default Dialog;