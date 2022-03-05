import React from 'react';
import { Link } from 'react-router-dom';

import styles from './user-navigation.m.less';

const UserNavigation = () => {

	return (
		<ul className={styles.userList}>
			<li>
				<Link to="/" className={styles.linkLogin}>
					My account
				</Link>
			</li>
		</ul>
	);
};

export default UserNavigation;