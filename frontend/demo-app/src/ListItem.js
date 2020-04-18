import React, {Component} from 'react';

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInput: false,
            valueCon: '',
        }
        this.handleFinished = this.handleFinished.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleFinished() {
        var status = this.props.item.status;

        status = (status === 0 ? 1 : 0);

        var obj = {
            id: this.props.item.id,
            name: this.props.item.name,
            status: status
        }

        this.props.finishedChange(obj);
    }

    handleDelete() {
        this.props.totalChange(this.props.item);
    }

    //点击展示输入框
    handleChangeClick = () => {
        this.setState({
            showInput: true
        })
    };
//点击关闭输入框
    handleCloseClick = () => {
        this.setState({
            showInput: !this.state.showInput
        })
    };

//点击确定按钮
    handleAffirmClick = () => {
        var obj = {
            id: this.props.item.id,
            name: this.state.valueCon,
            status: this.props.item.status
        }
        this.props.finishedChange(obj);
        //关闭输入框
        this.setState({
            showInput: this.props.isShow
        })
    };
//input改变
    handleChange = (e) => {
        this.setState({
            valueCon: e.target.value
        })
    };

    componentDidMount() {
        this.setState({
            valueCon: this.props.value,
        })
    }

    render() {
        const item = this.props.item;

        const unfinish = {
            backgroundColor: '#DFFCB5',
            color: '#2EB872',
        };

        const finish = {
            backgroundColor: '#FFFA9D',
            color: '#FF9A3C',
            textDecoration: 'line-through'
        }

        var itemStyle = item.status === 0 ? unfinish : finish;

        return (
            <li className="task-item" id={"task-item-" + item.id} style={itemStyle}>
                {!this.state.showInput ?
                    <div className="change-input">
						<span onClick={this.handleFinished} id={item.id} className="check-btn"
							style={{backgroundColor: item.status === 0 ? '#fff' : '#A1EAFB'}}
			            ></span>
                        <span className="name">{item.name}</span>
                        <span className="update-btn" onClick={this.handleChangeClick}>修改</span>
                        <span className="delete-btn" onClick={this.handleDelete}>删除</span>
                    </div>
                    :
                    <div className="write-input">
                        <div className="write-input-name">
                            <input placeholder="请输入"
                                   defaultValue={this.props.value === '-' ? '' : this.props.value}
                                   onChange={this.handleChange}
                                   style={{height: '25px', margin: '0'}}
                            />
                        </div>
                        <div className="write-input-hide">
                            <span className="write-input-hide-yes" onClick={this.handleAffirmClick}>Y</span>
                            <span>/</span>
                            <span className="write-input-hide-no" onClick={this.handleCloseClick}>N</span>
                        </div>
                    </div>
                }
            </li>
        );
    }
}

export default ListItem;