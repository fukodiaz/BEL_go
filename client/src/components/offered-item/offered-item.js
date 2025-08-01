import React from 'react';
import {Link} from 'react-router-dom';

// import RatingItem from '../rating-item';
import CustomRating from '../custom-rating';
import {BelgoServiceConsumer} from '../belgo-service-context';

import like from './like_2.svg';
import styles from './offered-item.m.less';

const OfferedItem = (props) => {

	const { imageIntro, price, rating, concept, descriptionShort, 
			id, onPressLike, colorLike, idCity, slug, pageLikes=false,
			handleRating, authData, navigate, location } = props;

	return (
		<BelgoServiceConsumer.Consumer>
			{ (belgoService) => (
				<div className={styles.boxOffer}>
					<Link to={`/real_estate/${slug}/`} className={styles.linkOffer}>
						<img src={`${belgoService._apiImages}${imageIntro}`} alt="photo of the proposed building"
								className={styles.imageOffer} />
					</Link>
					<div className={styles.infoOffer}>
						{
							!pageLikes ? (
											<button className={styles.buttonLike} type="button"
													onClick={onPressLike}>
												<p className={styles.svgBox} style={colorLike}>
													<svg width="34" height="30">
														<use href={`${like}#like`}></use>
													</svg>
												</p>
											</button>
										) :null
						}
						<p className={styles.priceOffer}>
							<b>&#8364;{price}</b>
							<span>/</span>night
						</p>
						{/* <RatingItem rating={rating} /> */}
						<CustomRating
								initialRating={rating}
								id={id}
								authData={authData}
								navigate={navigate}
								location={location}
  								readonly />

						<p className={styles.descrOffer}>
							{descriptionShort}
						</p>
						<p className={styles.conceptOffer}>
							{concept}
						</p>
					</div>
				</div>
			)}
		</BelgoServiceConsumer.Consumer>
	);
};

export default OfferedItem;