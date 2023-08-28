import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import { useParams } from 'react-router-dom';

import ItemDetails from '../item-details';

import styles from './page-details.m.less';

const PageDetails = (props) => {
	const {visibleListOffers, idCityActive} = props;
	const {id: idPage} = useParams();

	useEffect(() => {
		window.scrollTo(0, 315);
	}, []);

	return (
		<div className={styles.boxDetails}>
			{
				visibleListOffers.map((data) =>{
					const { id } = data;
					if (idPage == id) {
						return <ItemDetails key={id} {...data} />;
					}

					return null;
				})
			}
		</div>
	);
};

const mapStateToProps = ({ visibleListOffers, idCityActive }) => ({
	visibleListOffers,
	idCityActive
});

export default connect(mapStateToProps)(PageDetails);