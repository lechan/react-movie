import React from 'react';
import {Row, Col,Menu,Icon,Input,message} from 'antd';
import {Link} from 'react-router';
import {getTabData} from '../util/tool';
class PCHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tabData : [],
			current: !this.props.keyword?this.props.type:'',
			inputValue: this.props.keyword,
			keyword: this.props.keyword
		};
	};
	componentWillMount() {
		var This = this;
		getTabData(function(data){
			This.setState({tabData : data});
		});
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
			window.open('https://www.cilimao.me/search?word=' + value)
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
		const tabData = this.state.tabData;
		const menuContent = tabData && tabData.length
		 	? tabData.map((item, index) =>
				<Menu.Item key={item.type_code}>
					<Link to={`/list/${item.type_code}`}>
						<Icon type="appstore"/>{item.type_name}
					</Link>
				</Menu.Item>
			)
			:'';
		const Search = Input.Search;
		return (
			<header class="header">
				<Row>
					<Col span={2}></Col>
					<Col span={3}>
						<a href="/" class="logo">
							<i class="logo"></i>
							<span>电影头条</span>
						</a>
					</Col>
					<Col span={17}>
						<div class="searchbar">
							<label>搜索电影：<a href="https://www.cilimao.me/online_play" target="_blank">付费视频免费看</a></label>
							<Search 
								size="large" 
								placeholder="请输入电影名称" 
								style={{ width: 500 }} 
								value={this.state.inputValue}
								defaultValue={this.state.keyword} 
								onChange={this.onChangeInputValue.bind(this)}
								onSearch={value => this.searchList(value)} 
							/>
					  </div>
						<Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
							{menuContent}
						</Menu>
					</Col>
					<Col span={2}></Col>
				</Row>
			</header>
		);
	};
}
export default PCHeader;
