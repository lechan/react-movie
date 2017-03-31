import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import {Tabs} from 'antd';
import MobileList from './mobile_list';
import '../../css/mobile.css';
const TabPane = Tabs.TabPane;
export default class MobileIndex extends React.Component {
	render() {
		return (
			<div>
				<MobileHeader></MobileHeader>
				<Tabs defaultActiveKey="1">
					<TabPane tab="欧美电影" key="1">
						<MobileList type={"10001"} />
					</TabPane>
					<TabPane tab="国内电影" key="2">
						<MobileList type={"10002"} />
					</TabPane>
					<TabPane tab="日韩电影" key="3">
						<MobileList type={"10003"} />
					</TabPane>
					<TabPane tab="欧美电视剧" key="4">
						<MobileList type={"10004"} />
					</TabPane>
				</Tabs>
				<MobileFooter></MobileFooter>
			</div>
		);
	};
}
