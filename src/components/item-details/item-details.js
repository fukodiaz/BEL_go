import React from 'react';
import {Link} from 'react-router-dom';

import Map from '../map';
import RatingItem from '../rating-item';

import styles from './item-details.m.less';

const ItemDetails = (props) => {

	const {imageDetails, price, rating, concept, descriptionShort, information} = props;

	return (
		<div className={styles.mainContainer}>
			<div className={styles.firstContainter}>
				<a href="#" className={styles.linkImage}>
					<img 	src={imageDetails} alt="offer photo" 
							className={styles.offerImage} />
				</a>
				<div className={styles.mapBox}>
					<p className={styles.labelMap}>Location</p>
					<Map stylesMapContainer={styles.mapContainer} />
				</div>
			</div>

			<div className={styles.secondContainer}>
				<div className={styles.motileBox}>
					<div className={styles.boxDescription}>
						<p className={styles.descriptionShort}>{descriptionShort}</p>
						<p>{concept}</p>
						<div className={styles.information}>{information}</div>
						<RatingItem rating={rating} />
						<p className={styles.price}>
							<span>Price per night</span>
							<b>
								{price}
								<b className={styles.euro}>&#8364;</b>
							</b>
						</p>
					</div>
					<Link to=""
							className={styles.linkOrder}>
						make an order !
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ItemDetails;