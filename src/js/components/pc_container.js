import React from 'react';
import {Row, Col} from 'antd';
import PCImageBlock from './pc_image_block';
export default class PCContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type: this.props.type,
			keyword : this.props.keyword
		};
	};
	componentWillReceiveProps(nextProps) {
    this.setState({type: nextProps.type,keyword: nextProps.keyword});
  }
	render() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			autoplay: true
		};
		return (
			<Row>
				<Col span={2}></Col>
				<Col span={20} class="container">
					<PCImageBlock type={this.state.type} keyword={this.state.keyword} pagesize={18} />
				</Col>
				<Col span={2}></Col>
			</Row>
		);
	};
}
