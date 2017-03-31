import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCContainer from './pc_container';
import '../../css/pc.css';
export default class PCIndex extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type: this.props.params.type || '10001'
		};
	};
	changeType(currentType){
		this.setState({
			type:currentType
		})
	};
	render() {
		return (
			<div>
				<PCHeader type={this.state.type} changeType={this.changeType.bind(this)}></PCHeader>
				<PCContainer type={this.state.type}></PCContainer>
				<PCFooter></PCFooter>
			</div>
		);
	};
}
