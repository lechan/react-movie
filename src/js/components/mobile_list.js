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
					<Link to={`detail/${item.id}`} target="_blank">
						<div class="mobile-image" style={{paddingTop:`${item.height?(item.height/item.width)*100:140}%`}}>
							<iframe frameBorder="0" scrolling="no" width="100%" height="100%" src={`
								javascript:void(function(){document.open();document.write('
								<style type="text/css">body{margin:0;}</style>
								<a href="/#/detail/${item.id}" target="_blank"><img width="100%" src="${item.film_imgs[0]}" title="${item.film_name}" /></a>
								');document.close();}())`} data-img={item.film_imgs[0]}></iframe>
							{/*<img alt="" src={item.film_imgs[0]}/>*/}
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
