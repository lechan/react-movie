import React from 'react';
import {Row, Col,Menu,Icon} from 'antd';
import {Link} from 'react-router'
class PCHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			current: this.props.type
		};
	};
	handleClick(e) {
    this.setState({
      current: e.key,
    });
    this.props.changeType(e.key);
  };
	render() {
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
							<Menu.Item key="10001">
								<Link to="list/10001">
									<Icon type="appstore"/>欧美电影
								</Link>
							</Menu.Item>
							<Menu.Item key="10002">
								<Link to="list/10002">
									<Icon type="appstore"/>国内电影
								</Link>
							</Menu.Item>
							<Menu.Item key="10003">
								<Link to="list/10003">
									<Icon type="appstore"/>日韩电影
								</Link>
							</Menu.Item>
							<Menu.Item key="10004">
								<Link to="list/10004">
									<Icon type="appstore"/>欧美电视剧
								</Link>
							</Menu.Item>
						</Menu>
					</Col>
					<Col span={2}></Col>
				</Row>
			</header>
		);
	};
}
export default PCHeader;
