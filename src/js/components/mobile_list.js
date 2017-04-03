import React from 'react';
import {Card,Spin,Button} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';
import {getListData,formatDate} from '../util/tool';
import Masonry from 'react-masonry-component';
export default class MobileList extends React.Component {
	constructor() {
		super();
		this.state = {
			listData:[],
			p:1,
			loading: false,
			btnLoading: false
		};
	};
	componentWillMount() {
		let This = this;
		This.setState({loading: true});
		getListData("FilmDetail",this.state.p,this.props.pagesize,this.props.type,function(data){
			This.setState({listData : data,"loading": false});
		});
	};
  getMore(){
    this.setState({ p:this.state.p += 1, btnLoading: true });
    let This = this;
		getListData("FilmDetail",this.state.p,this.props.pagesize,this.props.type,function(data){
			This.setState({listData: This.state.listData.concat(data),"btnLoading": false});
		});
  };
	render() {
		const listData = this.state.listData;
		const list = listData && listData.length
			? listData.map((item, index) => 
				<Card bodyStyle={{ padding: 5 }} key={index}>
					<Link to={`detail/${item.id}`}>
						<div class="mobile-image">
							<img alt="" src={item.film_imgs[0]}/>
						</div>
						<div class="mobile-card">
							<h3>{item.film_name}</h3>
							<p>{formatDate(new Date(item.publish_time).getTime(),'yyyy-MM-dd')}</p>
						</div>
					</Link>
				</Card>
			)
			: '';
		const masonryOptions = {
		    transitionDuration: 0
		};
		return (
			<div>
				<div class="mobile_list">
					<Masonry
	          options={masonryOptions} // default {}
	          disableImagesLoaded={false} // default false
	          updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
	        >
						{list}
					</Masonry>
					<div class="loading">
						<Spin size="large" tip="加载中..." spinning={this.state.loading} />
					</div>
				</div>
				<div class="more">
					<Button type="primary" size="large" loading={this.state.btnLoading} onClick={this.getMore.bind(this)}>加载更多</Button>
				</div>
			</div>
		);
	};
}
