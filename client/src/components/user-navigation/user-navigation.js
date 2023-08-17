import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import url from './login.svg';
import like from './like_2.svg';
import styles from './user-navigation.m.less';

const UserNavigation = () => {
	let location = useLocation();

	return (
		<ul className={styles.userList}>
			<li className={styles.itemFavorite}>
				<Link to="/likes" className={styles.linkFavorite}>
					<span>Favorite</span>

					<p className={styles.svgBox}>
						<svg width="34" height="30">
							<use href={`${like}#like`}></use>
						</svg>
					</p>
				</Link>
			</li>
			<li>
				<Link to={`/auth${location.search}`} //preserve query params
						state={{previousLocation: location}}
						className={styles.linkLogin}
						>
					<span>My account</span>
					
					<p className={styles.svgBox}>
						<svg width="32" height="32">
							<use href={`${url}#login`}></use>
						</svg>
					</p>
				</Link>
			</li>
		</ul>
	);
};

export default UserNavigation;