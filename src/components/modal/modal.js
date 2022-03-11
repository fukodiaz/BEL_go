import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import { compose } from '../hoc';
import { withBelgoService } from '../hoc';
import { 
	dataFormSending,
	dataFormSuccess,
	dataFormError
} from '../../actions';

import styles from './modal.m.less';

const openModal = (modalSelector) => {
	const modal = document.querySelector(modalSelector);

	modal.classList.add(`${styles.modalShow}`);
	modal.classList.remove(`${styles.modalHide}`);
	document.body.style.overflow = 'hidden';
};

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

function Modal(props) {
	const {dataFormSend, dataFormSucc, dataFormErr, postDataForm, dataFormPosted, dispatch} = props;

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

	const [dataForm, setDataForm] = useState({});
	//const formModal = document.querySelector('form');

	const	setOnHandleSubmit = (json) => {
		postDataForm(json)
			.then((data) => {
				// setDataForm(dataForm => {
				// 	console.log({...data, tt: 'yy'});
				// 	return {...dataForm, data}
				// });
				setDataForm({...data, rr: 'uu'});
				//console.log(data);
				//dataFormSucc({...data});
				dispatch({type: 'DATA_FORM_SUCCESS', payload: {...data}});
				console.log(dataFormPosted, 33333333333333333333333333333333333333);
			}).catch(error => {
				dataFormErr(error);
				console.log(error);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const json = JSON.stringify(Object.fromEntries(formData.entries(formData)));
		//setJsonData(json);
		setOnHandleSubmit(json);
		//console.log(dataForm, 1111111111);
	};


	return (
		<div className={styles.modalBox}
				onClick={ (e) => onClickModalBox('[class^="modalBox"]', e) }>
				
			<div className={styles.modalDialog}>
				<div className={styles.modalContent}>
					<form onSubmit={handleSubmit} 
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
}

const mapMethodsToProps = (belgoService) => ({
	postDataForm: belgoService.postDataForm
});

const mapStateToProps = ({dataFormPosted}) => ({
	dataFormPosted: dataFormPosted
});

const mapDispatchToProps = (dispatch) => ({
	dataFormSend: () => dispatch(dataFormSending()),
	dataFormSucc: (data) => dispatch(dataFormSuccess(data)),
	dataFormErr: (error) => dispatch(dataFormError(error)),
	dispatch: (action) => dispatch(action)
});
//sendDataForm: (data) => sendDataForm(postDataForm, dispatch)(data)

export default compose(
	withBelgoService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(Modal);

export {
	openModal,
	hideModal
};