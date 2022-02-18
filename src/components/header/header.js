import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import styles from './header.m.less';
import imgTab from './back-main-tablet.jpg';
import imgDesk from './back-main-desktop.jpg';

export default class Header extends Component {

	render() {
		
		return (
			<header className={styles.mainheader}>
				<picture>
						<source media="(min-width: 1280px)" srcSet={imgDesk} />
						<source media="(min-width: 768px)" srcSet={imgTab} />
						<img src={imgTab} alt="логотип &#171;Седоны&#187;" />
				</picture>
				<ul className={styles.navigation}>
					<li>
						<Link to='antwerp'>Antwerp</Link>
					</li>
					<li>
						<Link to='bruges'>Bruges</Link>
					</li>
					<li>
						<Link to='charleroi'>Charleroi</Link>
					</li>
					<li>
						<Link to='liege'>Liege</Link>
					</li>
				</ul>
			</header>
		);
	}
}
