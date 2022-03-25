import React from 'react';

import './error-indicator.m.less';
import src from './error.png';

const ErrorIndicator = () => {
	return (
		<div className='error-indicator'>
			<img src={src} alt='image of error' />
			<span className='error'>ERROR!</span>
			<span>
				something has gone wrong
			</span>
		</div>
	);
};

export default ErrorIndicator;