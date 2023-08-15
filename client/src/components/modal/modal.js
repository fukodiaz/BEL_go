import React, { useState, useEffect } from 'react';

import styles from './modal.m.less';

const Modal = (props) => {
	const { onSwitch = ()=>{}, timerHide = 0, children } = props;

	if (timerHide) {
		setTimeout(() => onSwitch(), timerHide);
	}

	//switch ability of body-scroll in mounted/unmounted state
	useEffect(() => {
		document.body.scroll = 'no';
		return () => {
			document.body.scroll = 'yes';
		}
	}, [])

	useEffect(() => {	
		const onKeydown = (e) => {
			if (e.code === 'Escape') {
				document.body.style.overflow = ''
				onSwitch()
			}
		}

		document.addEventListener('keydown', onKeydown);
		return () => document.removeEventListener("keydown", onKeydown);
	}, []);

	return (
		<section className={styles.modalContainer}
					onClick={onSwitch}
					>
			<div className={styles.modalDialog}
					onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</section>
	);
};

export default Modal;