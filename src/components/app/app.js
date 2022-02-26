import React, {Component} from 'react';

import Header from '../header';
import ListItems from '../list-items';
import FilterCategory from '../filter-category';
import InnerHeading from '../inner-heading';
import Map from '../map';

import styles from './app.m.less';

export default class App extends Component {

	render() {
		return (
			<div className={styles.box}>
				<Header />
				<main>
					<div className={styles.contentBox}>
						<InnerHeading />
						<FilterCategory />
						<div className={styles.containerOffers}>
							<ListItems />
						</div>
					</div>
					<div className={styles.mapWrapper}>
						<Map />
					</div>
				</main>
			</div>
		);
	}
}
