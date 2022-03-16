import React, {useEffect} from 'react';

import { onClickModalBox, hideModal } from '../../utils';
import styles from './modal-box.m.less';

function ModalBox(props) {
	const {handleSubmit, login, password, isLoading} = props;

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

	useEffect(() => {
			const modalBox = document.querySelector('[class^="modalBox"]');
	
			const onKeydown = (e) => {
				if (e.code === 'Escape' && modalBox.style.display === 'block') {
					hideModal('[class^="modalBox"]');
				}
			}
	
			document.addEventListener('keydown', onKeydown);
			return () => document.removeEventListener("keydown", onKeydown);
	}, []);

	return (
		<div className={styles.modalBox}
					onClick={(e) => onClickModalBox('[class^="modalBox"]', e)}>
					
			<ModalDialog handleSubmit={handleSubmit} login={login} 
								password={password} isLoading={isLoading} />
		</div>
	);
}

const ModalDialog = (props) => {
	const {handleSubmit, login, password, isLoading} = props;

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


export default ModalBox;