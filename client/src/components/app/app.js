import React, {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';

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

	return (
		<div className={styles.mainWrapper} id='wrapper'>
			<Header />
			<Routes>
				<Route path="/" exact element={<MainPage />} />
				<Route path="/:id" element={<PageDetails />} />
				<Route path="/likes" element={<ListLikedOffers />} />
			</Routes>
			<AuthModal />
			<ModalMessage />
		</div>
	);
};

export default App;
