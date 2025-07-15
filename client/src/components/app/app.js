import React, {useEffect} from 'react';
import {Routes, Route, useLocation, Navigate, } from 'react-router-dom';

import Header from '../header';
import MainPage from '../main-page';
import PageDetails from '../page-details';
import ListLikedOffers from '../list-liked-offers';
import AuthModal from '../auth-modal';
import ModalMessage from '../modal-message';

import styles from './app.m.less';

const App = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	//accept previousLocation for auth-modal overlay
	const location = useLocation();
	const previousLocation = location.state?.previousLocation;

	// console.log('location: ',location);
	// console.log('previousLocation: ', previousLocation);

	return (
		<div className={styles.mainWrapper} id='wrapper'>
			<Header />
			
				<Routes 
					location={previousLocation || location}
					>

						
					<Route path="/" exact element={<Navigate to="/real_estate" replace />} />
					<Route path="/real_estate" exact element={<MainPage />} />
					<Route path="/real_estate/category/:idConcep" element={<MainPage />} />
					
					<Route path="/real_estate/:id" element={<PageDetails />} />
					<Route path="/likes" element={<ListLikedOffers />} />

					
				</Routes>
			
			{
				previousLocation && (
				<Routes>
					<Route path='/auth' element={<AuthModal />} />
				</Routes>
				)
			}
			
			<ModalMessage />
		</div>
	);
};

export default App;
