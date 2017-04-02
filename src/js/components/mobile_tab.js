import React from 'react';
import {Tabs} from 'antd';
import MobileList from './mobile_list';
import {getTabData} from '../util/tool';
const TabPane = Tabs.TabPane;
class MobileTab extends React.Component{
	constructor() {
		super();
		this.state = {
			tabData : []
		};
	};
	componentWillMount() {
		var This = this;
		getTabData(function(data){
			This.setState({tabData : data});
		});
	};
	render(){
		const tabData = this.state.tabData;
		const tabContent = tabData && tabData.length
			? tabData.map((item, index) =>
				<TabPane tab={item.type_name} key={index}>
					<MobileList type={item.type_code} pagesize="10" />
				</TabPane>
			)
			:'';
		return (
			<Tabs defaultActiveKey="0">
				{tabContent}
			</Tabs>
		)
	}
}

export default MobileTab;