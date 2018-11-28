import React from 'react';
import {Icon, Input} from 'antd';
class MobileHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tabData : [],
			current: !this.props.keyword?this.props.type:'',
			inputValue: this.props.keyword,
			keyword: this.props.keyword
		};
	};
	handleClick(e) {
		this.setState({
			current: e.key,
			keyword: ''
		});
		this.props.changeType(e.key);
		this.setState({ inputValue: '' });
	};
	searchList(value){
		if(value!==""){
			window.open('https://www.cilimao.cc/search?word=' + value)
			// this.setState({
			// 	current:'',
			// 	inputValue:value,
			// 	keyword:value
			// });
			// this.props.changeKeyWord(value);
		}else{
			message.warn('请输入电影名称')
		}
	};
	onChangeInputValue(e){
		this.setState({ inputValue: e.target.value });
	};
	render() {
		const Search = Input.Search
		return (
			<div id="mobileheader">
				<header>
					<img src="./src/images/logo.png" alt="logo"/>
					<span>电影头条</span>
					{/* <Icon type="setting" /> */}
				</header>
				<div class="searchbar">
					<label>搜索电影：<a href="https://www.cilimao.cc/online_play" target="_blank">付费视频免费看</a></label>
					<Search 
						size="large" 
						placeholder="请输入电影名称"
						value={this.state.inputValue}
						defaultValue={this.state.keyword} 
						onChange={this.onChangeInputValue.bind(this)}
						onSearch={value => this.searchList(value)} 
					/>
				</div>
			</div>
		);
	};
}

export default MobileHeader;
