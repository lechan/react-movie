import React from 'react';
import {Row, Col,Menu,Icon} from 'antd';
import {Link} from 'react-router';
import {getTabData} from '../util/tool';
class PCHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tabData : [],
			current: this.props.type
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
    });
    this.props.changeType(e.key);
  };
	render() {
		const tabData = this.state.tabData;
		const menuContent = tabData && tabData.length
		 	? tabData.map((item, index) =>
				<Menu.Item key={item.type_code}>
					<Link to={`list/${item.type_code}`}>
						<Icon type="appstore"/>{item.type_name}
					</Link>
				</Menu.Item>
			)
			:'';
		return (
			<header class="header">
				<Row>
					<Col span={2}></Col>
					<Col span={4}>
						<a href="/" class="logo">
							<img src="./src/images/logo.png" alt="logo"/>
							<span>电影头条</span>
						</a>
					</Col>
					<Col span={16}>
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
