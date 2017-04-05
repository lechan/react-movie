import React from 'react';
import {Row, Col,BackTop} from 'antd';
export default class MobileFooter extends React.Component {

	render() {
		return (
			<footer class="mobile-foot">
				<BackTop/>
				<Row>
					<Col span={2}></Col>
					<Col span={20} class="footer">
						<p>下载电影就来电影头条网，本站资源均为网络免费资源搜索机器人自动搜索的结果，本站只提供最新电影下载，并不存放任何资源。所有视频版权归原权利人，将于24小时内删除！我们强烈建议所有影视爱好者购买正版音像制品！ 本站拒绝一切非法，淫秽电影，欢迎大家监督 有问题可联系管理员</p>
						<p>&copy;&nbsp;2017 电影头条. All Rights Reserved.</p>
					</Col>
					<Col span={2}></Col>
				</Row>
			</footer>
		);
	};
}
