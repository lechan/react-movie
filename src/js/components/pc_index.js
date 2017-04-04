import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCContainer from './pc_container';
import {hashHistory} from 'react-router';
import '../../sass/pc.scss';
export default class PCIndex extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type: !this.props.params.keyword ? (this.props.params.type || '10001') : "",
			keyword: this.props.params.keyword || ''
		};
	};
	changeType(currentType){
		this.setState({
			type:currentType,
			keyword:''
		})
	};
	changeKeyWord(keyword){
		this.setState({
			type:'',
			keyword:keyword
		});
		hashHistory.push('/search/q='+keyword);
	};
	render() {
		return (
			<div>
				<PCHeader type={this.state.type} keyword={this.state.keyword} changeType={this.changeType.bind(this)} changeKeyWord={this.changeKeyWord.bind(this)}></PCHeader>
				<PCContainer type={this.state.type} keyword={this.state.keyword}></PCContainer>
				<PCFooter></PCFooter>
			</div>
		);
	};
}
