import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import MobileTab from './mobile_tab';
import '../../css/mobile.css';
export default class MobileIndex extends React.Component {
	render() {
		return (
			<div>
				<MobileHeader></MobileHeader>
				<MobileTab></MobileTab>
				<MobileFooter></MobileFooter>
			</div>
		);
	};
}
