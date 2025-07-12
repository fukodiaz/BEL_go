import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';

import {onClickModalBox, hideModal} from '../../utils';
import styles from './modal-message.m.less';

function ModalMessage({authenSending, authData}) {

	const [message, setMessage] = useState("modal message");

	useEffect(() => {
		const modalContainer = document.querySelector('[class^="modalBox"]');

		const onKeydown = (e) => {
			if (e.code === 'Escape' && modalContainer.style.display === 'block') {
				hideModal('[class^="modalBox"]');
			}
		}

		document.addEventListener('keydown', onKeydown);
		return () => document.removeEventListener("keydown", onKeydown);
	}, []);

	useEffect(() => {
		if (typeof authData === 'object' && authData?.hasOwnProperty('msg')) {
			if (authData['msg'] != '') 
				setMessage(authData['msg'])
			else
				setMessage('Something has gonna wrong...');
			document.querySelector('[class^="modalBox"]').style.display = "block";
		}

	}, [authenSending, authData]);

	const onClickModalMessage = (e) => onClickModalBox('[class^="modalBox"]', e)

	return (
		<div className={styles.modalBox} 
				onClick={onClickModalMessage}>
			<div className={styles.modalDialog}>
				<div className={styles.modalContent}>
					<button className={styles.modalClose} type='button'
								onClick={() => hideModal('[class^="modalBox"]')} />
					<p className={styles.modalTitle}>
						{message}
					</p>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = ({authenDataPosted, authenSending}) => ({
	authData: authenDataPosted,
	authenSending
});

export default connect(mapStateToProps)(ModalMessage);