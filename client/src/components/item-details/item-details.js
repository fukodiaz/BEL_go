import React from 'react';
import {Link} from 'react-router-dom';

import Map from '../map';
import RatingItem from '../rating-item';
import {BelgoServiceConsumer} from '../belgo-service-context';

import  {openModal}  from '../../utils';
import styles from './item-details.m.less';

const ItemDetails = (props) => {
	const {imageDetails, imageIntro, price, rating, concept, descriptionShort, information, conception, address} = props;

	return (
		<BelgoServiceConsumer.Consumer>
			{ (belgoService) => (
				<div className={styles.mainContainer}>
					<div className={styles.firstContainter}>
						<a href="#" className={styles.linkImage}>
							<picture className={styles.pictureDetails}>
								<source media="(min-width: 1280px)" srcSet={`${belgoService._apiImages}${imageDetails}`} />
								<img 	src={`${belgoService._apiImages}${imageIntro}`} alt="offer photo" 
										className={styles.offerImage} />
							</picture>
						</a>
							<p className={styles.labelMap}>Location</p>
							<Map stylesMapContainer={styles.mapContainer} address_detail={props} />
					</div>

					<div className={styles.secondContainer}>
						<div className={styles.motileBox}>
							<div className={styles.boxDescription}>
								<p className={styles.descriptionShort}>{descriptionShort}</p>
								<p>{conception?.label}</p>
								<div className={styles.information}>{information}</div>
								<RatingItem rating={rating} />
								<p className={styles.price}>
									<span>Price per night</span>
									<b>
										{Math.round(price)}
										<b className={styles.euro}>&#8364;</b>
									</b>
								</p>
							</div>
							{/* <Link to=""
									className={styles.linkOrder}
									onClick={() => openModal('[class^="modalBox"]')} >
								make an order !
							</Link> */}
						</div>
					</div>

					<Map stylesMapContainer={styles.mapContainer_2} address_detail={props} />
				</div>
			)}
		</BelgoServiceConsumer.Consumer>
	);
};

export default ItemDetails;