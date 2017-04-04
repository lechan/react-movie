import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import PCIndex from './components/pc_index';
import PCDetail from './components/pc_detail';
import MobileDetail from './components/mobile_detail';
import MobileIndex from './components/mobile_index';
import MediaQuery from 'react-responsive';
export default class Root extends React.Component {
	render() {
		return (
			<div>
				<MediaQuery query='(min-device-width: 1224px)'>
					<Router history={hashHistory}>
						<Route path="/" component={PCIndex}></Route>
						<Route path="/list/:type" component={PCIndex}></Route>
						<Route path="/search/q=:keyword" component={PCIndex}></Route>
						<Route path="/detail/:id" component={PCDetail}></Route>
					</Router>
				</MediaQuery>
				<MediaQuery query='(max-device-width: 1224px)'>
					<Router history={hashHistory}>
						<Route path="/" component={MobileIndex}></Route>
						<Route path="/list/:type" component={MobileIndex}></Route>
						<Route path="/detail/:id" component={MobileDetail}></Route>
					</Router>
				</MediaQuery>
			</div>
		);
	};
}
ReactDOM.render(
	<Root/>, document.getElementById('mainContainer'));
