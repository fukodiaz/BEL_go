import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import Map from '../map';
import RatingItem from '../rating-item';

import styles from './page-details.m.less';

const PageDetails = (props) => {

	const {id: idPage} = useParams();
	const {dataCities, visibleListOffers, activeCity} = props;

	const [flag, setFlag] = useState(false);

	useEffect(() => {
		const header = document.querySelector('header');
		const heightHeader = window.getComputedStyle(header).height.replace(/[^\d.]/ig, '');
		const boxDetails = document.querySelector('[class^="boxDetails"]');
		const paddingTopBoxDetails = window.getComputedStyle(boxDetails).paddingTop.replace(/[^\d.]/ig, '');
		const motileBox = document.querySelector('[class^="motileBox"]');
		const offset = +heightHeader + +paddingTopBoxDetails;
		
		const onScroll = () => {
			if (window.pageYOffset > offset) {
				setFlag((flag) => flag = true);
				if (flag) {
					motileBox.style.top = `${window.pageYOffset - offset}px`;
				}
			} else {
				setFlag((flag) => flag = false);
				motileBox.style.top = 0;
			}
		};

		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, [flag]);

	return (
		<div className={styles.boxDetails}>
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