import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { compose } from '../hoc';
import { withBelgoService } from '../hoc';
import { sendDataForm } from '../../actions';

import styles from './modal.m.less';
import './modal.css';

function openModal(modalSelector) {
	const modal = document.querySelector(modalSelector);

	modal.classList.add(`${styles.modalShow}`);
	modal.classList.remove(`${styles.modalHide}`);
	document.body.style.overflow = 'hidden';
}

function hideModal(modalSelector) {
	const modal = document.querySelector(modalSelector);

	modal.classList.add(`${styles.modalHide}`);
	modal.classList.remove(`${styles.modalShow}`);
	document.body.style.overflow = '';
}

const onClickModalBox = (modalSelector, e) => {
	const modal = document.querySelector(modalSelector);

	if (e.target == modal) {
		hideModal(modalSelector);
	}
};

const Modal = ({dataFormPosted, sendDataForm, postDataForm}) => {

	useEffect(() => {
		const modalBox = document.querySelector('[class^="modalBox"]');

		const onKeydown = (e) => {
			if (e.code === 'Escape' && modalBox.classList.contains(`${styles.modalShow}`)) {
				hideModal('[class^="modalBox"]');
			}
		};

		document.addEventListener('keydown', onKeydown);

		return () => document.removeEventListener("keydown", onKeydown);
	});

	useEffect(() => {
		const formModal = document.querySelector('form');

		formModal.addEventListener('submit', (e) => {
			e.preventDefault();

			// postDataForm(formModal)
			// 	.then(data => console.log(data, 999))
			// 	.finally(() => {
			// 		formModal.reset();
			// 	});


			sendDataForm(formModal);
			
			//openModal('[class^="modalBox"]');
			console.log(dataFormPosted);
			
		});
	}, []);

	return (
		<div className={styles.modalBox}
				onClick={ (e) => onClickModalBox('[class^="modalBox"]', e) }>
				
			<div className={styles.modalDialog}>
				<div className={styles.modalContent}>
					<form action="http://localhost:3000/requests" method="post"
							>
						<button className={styles.modalClose} type='button'
									onClick={() => hideModal('[class^="modalBox"]')}>
							&times;
						</button>
						<p className={styles.modalTitle}>
							please enter your email and password
						</p>
						<input 	type="email" name="login" className={styles.modalInput}
									placeholder="email@example.com" required />
						<input 	type="password" name="password" className={styles.modalInput}
									placeholder="password" required />
						<button className={styles.modalEnter} type="submit">
							sign up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

const mapMethodsToProps = (belgoService) => ({
	postDataForm: belgoService.postDataForm
});

const mapStateToProps = ({dataFormPosted}) => ({
	dataFormPosted: dataFormPosted
});

const mapDispatchToProps = (dispatch, {postDataForm}) => ({
	sendDataForm: (data) => sendDataForm(postDataForm, dispatch)(data)
});

export default compose(
	withBelgoService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(Modal);

export {
	openModal,
	hideModal
};