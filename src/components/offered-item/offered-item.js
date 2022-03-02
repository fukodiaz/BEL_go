import React from 'react';
import {Link} from 'react-router-dom';

import RatingItem from '../rating-item';

import styles from './offered-item.m.less';

const OfferedItem = (props) => {

	const { imageIntro, price, rating, 
			concept, descriptionShort, id } = props;

	return (
		<div>
			<Link to={id}>
				<img src={imageIntro} alt="photo of the proposed building" />
			</Link>
			<p>
				<b>&#8364;{price}</b>
				<span>/night</span>
			</p>
			<RatingItem rating={rating} />
			<p>{descriptionShort}</p>
			<p>{concept}</p>
		</div>
	);
};

export default OfferedItem;