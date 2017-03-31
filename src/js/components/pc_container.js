import React from 'react';
import {Row, Col} from 'antd';
import PCImageBlock from './pc_image_block';
export default class PCContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type: this.props.type
		};
	};
	componentWillReceiveProps(nextProps) {
    this.setState({type: nextProps.type});
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
					<PCImageBlock type={this.state.type} />
				</Col>
				<Col span={2}></Col>
			</Row>
		);
	};
}
