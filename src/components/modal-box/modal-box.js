import React from 'react';

import styles from './modal-box.m.less';

function ModalBox(props) {
	const {handleSubmit, hideModal, login, password, isLoading} = props;

	const onClickModalBox = (modalSelector, e) => {
		const modal = document.querySelector(modalSelector);
	
		if (e.target == modal) {
			hideModal(modalSelector);
		}
	};

	return (
		<div className={styles.modalBox}
					onClick={ (e) => onClickModalBox('[class^="modalBox"]', e) }>
					
				<div className={styles.modalDialog}>
					<div className={styles.modalContent}>
						
						<form onSubmit={handleSubmit} >
							<button className={styles.modalClose} type='button'
										onClick={() => hideModal('[class^="modalBox"]')}>
								&times;
							</button>
							<p className={styles.modalTitle}>
								please enter your email and password
							</p>
							<input 	type="email" name="login" className={styles.modalInput}
										placeholder={login} required />
							<input 	type="password" name="password" className={styles.modalInput}
										placeholder={password} required />
							<button className={styles.modalEnter} type="submit">
								sign up
							</button>
						</form>
						{isLoading}
					</div>
				</div>
		</div>
	);
}

export default ModalBox;