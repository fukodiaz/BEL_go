import React from 'react';
import {Link} from 'react-router-dom';

import styles from './logo-header.m.less';
import url from './logo-belgium.svg';

const LogoHeader = () => {

	return (
		<Link to="/"
				className={styles.linkLogo}>
			<img 	src={url} 
					alt="logo image of BEL/go"
					className={styles.imageLogo} />
		</Link>
	);
};

export default LogoHeader;