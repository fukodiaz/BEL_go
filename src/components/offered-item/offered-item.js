import React from 'react';

import RatingItem from '../rating-item';

import styles from './offered-item.m.less';

const OfferedItem = (props) => {

	const {onOpenDetailPage, imageIntro, price, rating, 
			concept, descriptionShort } = props;

	return (
		<div>
			<a onClick={onOpenDetailPage}>
				<img src={imageIntro} alt="photo of the proposed building" />
			</a>
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