import styles from './utils.m.less';

const openModal = (modalSelector, message='') => {
	const modal = document.querySelector(modalSelector);

	modal.style.display = 'block';
	document.body.style.overflow = 'hidden';

	const modalTitle =  document.querySelector('[class^="modalTitle"]');
	if (message != '') {
		modalTitle.textContent = message;
	}
};

function hideModal(modalSelector) {
	const modal = document.querySelector(modalSelector);

	modal.style.display = 'none';
	// modal.classList.add(`${styles.modalHide}`);
	// modal.classList.remove(`${styles.modalShow}`);
	document.body.style.overflow = '';
}

const onClickModalBox = (modalSelector, e) => {
	const modal = document.querySelector(modalSelector);

	if (e.target == modal) {
		hideModal(modalSelector);
	}
};

export {
	openModal,
	hideModal,
	onClickModalBox
};