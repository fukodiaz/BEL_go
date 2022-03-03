import React from 'react';
import {connect} from 'react-redux';
import { useParams } from 'react-router-dom';

import Map from '../map';
import RatingItem from '../rating-item';

import styles from './page-details.m.less';

const PageDetails = (props) => {

	const {id: idPage} = useParams();
	const {dataCities, visibleListOffers, activeCity} = props;

	return (
		<div className={styles.box}>
			{
				visibleListOffers.map((data) =>{
					const {imageDetails, id, price, rating, concept, descriptionShort, information} = data;

					if (idPage === id) {
						return (
							<div key={id} className={styles.mainContainer}>
								<div className={styles.firstContainter}>
									<a href="#" className={styles.linkImage}>
										<img 	src={imageDetails} alt="offer photo" 
												className={styles.offerImage} />
									</a>
									<div className={styles.mapBox}>
										<p>Location</p>
										<Map stylesMapContainer={styles.mapContainer} />
									</div>
								</div>
								<div className={styles.secondContainer}>
									<p>{concept}</p>
									<p>{descriptionShort}</p>
									<div>{information}</div>
									<RatingItem rating={rating} />
									<p>
										<b>&#8364;{price}</b>
										<span>/night</span>
									</p>
								</div>
							</div>
						);
					}

					return null;
				})
			}
		</div>
	);
};

const mapStateToProps = ({dataCities, visibleListOffers, filterCities}) => ({
	dataCities,
	visibleListOffers,
	activeCity: filterCities
});

export default connect(mapStateToProps)(PageDetails);