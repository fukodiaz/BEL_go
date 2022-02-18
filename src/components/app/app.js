import React, {Component} from 'react';

import Header from '../header';
import ListItems from '../list-items';


import styles from './app.m.less';

export default class App extends Component {

	render() {
		return (
			<div className={styles.box}>
				<Header />
				<div>
					<ListItems />
				</div>
			</div>
		);
	}
}
