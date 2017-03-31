import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import {Row, Col,Button,message} from 'antd';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import {getDetailData,formatDate} from '../util/tool';
export default class PCNewsDetails extends React.Component {
	constructor() {
		super();
		this.state = {
			detailData : null,
			copied: false
		};
	};
	componentDidMount() {
		var This = this;
		getDetailData("FilmDetail",this.props.params.id,function(data){
			This.setState({detailData: data});
		});
	};
	componentDidUpdate() {
		// console.log(this.state);
	}
	render() {
		const {detailData} = this.state;
		const detailHtml = detailData && 
			(<div class="mobileDetailContainer">
				<h1>{detailData.film_name}</h1>
				<h2>发布时间：{formatDate(new Date(detailData.publish_time).getTime())}</h2>
				<div class="img_wrap">
					{detailData.film_imgs.map((item,index) => 
						<img src={item} key={index} />
					)}
				</div>
				<div class="content" dangerouslySetInnerHTML={{__html:detailData.film_des.replace(/\n/gi, '<br/>')}}></div>
				<div class="download_content">
					{detailData.download_url.length > 1 
						? 
						detailData.download_url.map((item,index) => 
							<CopyToClipboard text={item} key={index} onCopy={() => {this.setState({copied: true});message.success('复制下载地址成功，打开迅雷下载');}}>
          			<Button type="primary" icon="download" size="large">下载第{index+1}集</Button>
          		</CopyToClipboard>
						) 
						:
						<CopyToClipboard text={detailData.download_url[0]} onCopy={() => {this.setState({copied: true});message.success('复制下载地址成功，打开迅雷下载');}}>
							<Button type="primary" icon="download" size="large">下载</Button>
						</CopyToClipboard>
					}
				</div>
			</div>)
		return (
			<div>
				<MobileHeader></MobileHeader>
				<Row>
					<Col span={24} class="container">
						{detailHtml}
					</Col>
				</Row>
				<MobileFooter></MobileFooter>
			</div>
		);
	};
}
