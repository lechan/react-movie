import React from 'react';
import {Card,Spin,Button,Icon,message} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';
import {getListData,searchListData,formatDate} from '../util/tool';
import Masonry from 'react-masonry-component';
export default class PCImageBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			p:1,
			type: this.props.type,
			keyword: this.props.keyword,
			loading: false,
			btnLoading: false
		};
	};
	componentWillMount() {
		let This = this;
		This.setState({loading: true});
		if(this.state.keyword!==""){
			searchListData("FilmDetail",this.state.keyword,this.state.p,this.props.pagesize,function(data){
				This.setState({listData_default : data,"loading": false});
			});
		}else{
			let listName = "listData_"+This.state.type;
			getListData("FilmDetail",this.state.p,this.props.pagesize,this.state.type,function(data){
				This.setState({[listName] : data,"loading": false});
			});
		}
		
	};
	componentWillReceiveProps(nextProps) {
		let This = this;
		if(nextProps.keyword!==""){
			if(nextProps.keyword !== this.props.keyword){
	    	this.setState({"type":"","keyword":nextProps.keyword,"listData_default":[],"loading": true,"p":1});
    		searchListData("FilmDetail",nextProps.keyword,this.state.p,this.props.pagesize,function(data){
					This.setState({listData_default: data,"loading": false});
				});
	    }
		}else{
			if(nextProps.type !== this.props.type){
	    	let listName = "listData_"+nextProps.type;
	    	this.setState({"type": nextProps.type,"keyword":"",[listName]:this.state[listName],"loading": true,"p":1});
	    	if(!this.state[listName] || this.state[listName].length===0){
	    		getListData("FilmDetail",this.state.p,this.props.pagesize,nextProps.type,function(data){
						This.setState({[listName]: data,"loading": false});
					});
	    	}else{
	    		This.setState({"loading": false});
	    	}
	    }
		}
  };
  getMore(){
    this.setState({ p:this.state.p += 1, btnLoading: true });
	let This = this;
    if(this.state.keyword!==""){
    	searchListData("FilmDetail",this.state.keyword,this.state.p,this.props.pagesize,function(data){
    		if(data.length===This.props.pagesize){
    			This.setState({listData_default : This.state.listData_default.concat(data),"btnLoading": false});
    		}else{
    			message.info('已经是最后一页了');
    			This.setState({"btnLoading": false});
    		}
			});
    }else{
	    let listName = "listData_"+This.props.type;
			getListData("FilmDetail",this.state.p,this.props.pagesize,this.props.type,function(data){
				if(data.length===This.props.pagesize){
					This.setState({[listName]: This.state[listName].concat(data),"btnLoading": false});
				}else{
    			message.info('已经是最后一页了');
    			This.setState({"btnLoading": false});
    		}
			});
		}
	};
	handleImagesLoaded(imagesLoadedInstance) {
		// this.show();
		// console.log(imagesLoadedInstance)
	};
	handleLayoutComplete() { 

	};
  	componentDidMount() {
		// 使用滚动时自动加载更多
		const moreBtn = this.refs.more
		const loadMoreFn = this.getMore.bind(this)
		let timeoutId
		const callback = () => {
			const top = moreBtn.getBoundingClientRect().top
			const windowHeight = window.screen.height
			if (top && top < windowHeight - 200) {
				// 证明 moreBtn 已经被滚动到暴露在页面可视范围之内了
				loadMoreFn()
			}
		}
		window.addEventListener('scroll', () => {
			if (this.state.btnLoading) {
				return false
			}
			if (timeoutId) {
				clearTimeout(timeoutId)
			}
			timeoutId = setTimeout(callback, 100)
		}, false);
	};
	render() {
		const listData = this.state.keyword!=="" ? this.state.listData_default : this.state["listData_"+this.state.type];
		const list = listData && (listData.length>0
			? listData.map((item, index) =>
				<Card bodyStyle={{ padding: 5 }} key={index}>
					<Link to={`/detail/${item.id}`} target="_blank">
						<div class="custom-image" style={{paddingTop:`${item.height?(item.height/item.width)*100:140}%`}}>
							<iframe frameBorder="0" scrolling="no" width="100%" height="100%" src={`
								javascript:void(function(){document.open();document.write('
								<style type="text/css">body{margin:0;}</style>
								<a href="/#/detail/${item.id}" target="_blank"><img width="100%" src="${item.film_imgs[0]}" title="${item.film_name}" /></a>
								');document.close();}())`} data-img={item.film_imgs[0]}></iframe>
							{/*<img title={item.film_name} alt={item.film_name} src={item.film_imgs[0]}/>*/}
						</div>
						<div class="custom-card">
							<h3 title={item.film_name}>{item.film_name}</h3>
							<p>{formatDate(new Date(item.publish_time).getTime(),'yyyy-MM-dd')}</p>
						</div>
					</Link>
				</Card>
			)
			: <h3 class="no-movie"><Icon type="exclamation-circle-o" />未找到该电影</h3>);
		const masonryOptions = {
		    transitionDuration: 0
		};
		return (
			<div>
				<div class="pc_list">
					<Masonry
            options={masonryOptions} // default {}
            disableImagesLoaded={false} // default false
            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
            onImagesLoaded={this.handleImagesLoaded}
            onLayoutComplete={laidOutItems => this.handleLayoutComplete(laidOutItems)}
            onRemoveComplete={removedItems => this.handleRemoveComplete(removedItems)}
          >
						{list}	
					</Masonry>
					<div class="loading">
						<Spin size="large" tip="加载中..." spinning={this.state.loading} />
					</div>
				</div>
				<div class="more" ref="more">
					<Button type="primary" size="large" loading={this.state.btnLoading} onClick={this.getMore.bind(this)}>加载更多</Button>
				</div>
			</div>
		);
	};
}
