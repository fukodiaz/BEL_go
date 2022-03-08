import React, { useState, useEffect } from 'react';

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

const modalBox = document.querySelector('[class^="modalBox"]');
const modalContent = document.querySelector('[class^="modalContent"]');

const onClickModalBox = (e) => {
	if (e.target === modalBox ) {
		hideModal('[class^="modalBox"]');
	}
};

const Modal = () => {

	function clearSubmit(e) {
		e.preventDefault();
		console.log('clear');
	}

	const [flag, setFlag] = useState(false);


	const modalBox = document.querySelector('[class^="modalBox"]');

	useEffect(() => {
		document.addEventListener('keydown', (e) => {
			setFlag(true);

			if (e.code === 'Escape' && modalBox.classList.contains(`${styles.modalShow}`) && flag === true) {
				hideModal('[class^="modalBox"]');
			}
		});

		// modalBox.addEventListener('click', (e) => {
		// 	setFlag_2(true);
		// 	onClickModalBox(e, flag_2);
		// });
	}, [flag]);

	return (
		<div className={styles.modalBox}
				onClick={() => onClickModalBox(modalBox)}>
			<div className={styles.modalDialog}>
				<div className={styles.modalContent}>
					<form method='post' action="http://localhost:3000/requests"
							onSubmit={clearSubmit}>
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

export default Modal;

export {
	openModal,
	hideModal
};