import React from 'react';

import styles from './modal-box.m.less';

function ModalBox(props) {
	const {handleSubmit, hideModal, login, password,
			isLoading, isSuccess, isError} = props;


	const onClickModalBox = (modalSelector, e) => {
		const modal = document.querySelector(modalSelector);
	
		if (e.target == modal) {
			hideModal(modalSelector);
		}
	};

	const message = {
		success: "you have been successfully logged in !",
		failure: "Something went wrong..."
	};

	// ModalDialogue = (<ModalDialog 	handleSubmit={handleSubmit} hideModal={hideModal}
	// 												login={login} password={password}
	// 												isLoading={isLoading} />);

	// const showMessage = (isSuccess, isError) => {
	// 	if (isSuccess) {
	// 		ModalDialogue = (
	// 			<ModalDialogMessage message={message.success} hideModal={hideModal} />
	// 		);
	// 		openModal('[class^="modalBox"]');
	// 	}

	// 	if (isError) {
	// 		ModalDialogue = (
	// 			<ModalDialogMessage message={message.failure} hideModal={hideModal} />
	// 		);
	// 		openModal('[class^="modalBox"]');
	// 	}

	// 	return null;
	// };

		

	return (
		<div className={styles.modalBox}
					onClick={(e) => onClickModalBox('[class^="modalBox"]', e)}>
					
			<ModalDialog handleSubmit={handleSubmit} hideModal={hideModal}
							login={login} password={password} isLoading={isLoading} />
		</div>
	);
}

const ModalDialog = (props) => {
	const {handleSubmit, hideModal, login, password,
			isLoading} = props;

	return (
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
	);
};

const ModalDialogMessage = ({message, hideModal}) => {

	return (
		<div className={styles.modalDialog}>
			<div className={styles.modalContent}>
				<button className={styles.modalClose} type='button'
							onClick={() => hideModal('[class^="modalBox"]')} >
					&times;
				</button>
				<p className={styles.modalTitle}>
					{message}
				</p>
			</div>
		</div>
	);
};


export default ModalBox;