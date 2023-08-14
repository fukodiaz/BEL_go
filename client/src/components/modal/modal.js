import React, { useEffect } from 'react';

import { hideModal } from '../../utils';
import styles from './modal.m.less';

const Modal = (props) => {
	const { onSwitch = ()=>{}, timerHide = 0, children } = props;

	if (timerHide) {
		setTimeout(() => onSwitch(), timerHide);
	}

	useEffect(() => {
		const modalBox = document.querySelector('[class^="modalContainer"]');

		const onKeydown = (e) => {
			if (e.code === 'Escape' && modalBox.style.display === 'block') {
				hideModal('[class^="modalContainer"]');
			}
		}

		document.addEventListener('keydown', onKeydown);
		return () => document.removeEventListener("keydown", onKeydown);
}, []);

	return (
		<section className={styles.modalContainer}
			onClick={onSwitch}>
			<div className={styles.modalDialog}
					onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</section>
	);
};

export default Modal;