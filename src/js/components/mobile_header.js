import React from 'react';
import {Icon} from 'antd';
class MobileHeader extends React.Component {
	constructor() {
		super();
	};

	render() {
		
		return (
      <div id="mobileheader">
        <header>
          <img src="./src/images/logo.png" alt="logo"/>
          <span>电影头条</span>
					<Icon type="setting" />
        </header>
      </div>
		);
	};
}

export default MobileHeader;
