import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { compose } from '../hoc';
import { withBelgoService } from '../hoc';
import { 
	authenSending, loginSuccess, signUpSuccess,
	authenError, onAuthStatus
} from '../../actions';

import Modal from '../modal';
import AuthModalTemplate from '../auth-modal-template';
import {onClickModalBox, hideModal, openModal} from '../../utils';
import styles from './auth-modal.m.less';

const AuthModal = (props) => {
	const { authenSending, loginSuccess, signUpSuccess,
			authenError, onAuthStatus, authStatus, 
			isLoading, postSignUp, postLogin } = props;

	const modalRef = useRef();

	const navig = useNavigate();
	const onClose = () => { navig(-1) } 

	//primary validation inputs of auth-form 
	const [logValid, setLogValid] = useState(true);
	const [pwValid, setPWValid] = useState(true);
	const [rpwValid, setRPWValid] = useState(true);
	
	const handleSubmit = (e) => {
		e.preventDefault();

		//checking validation of form
		if (authStatus == 'login' && (!logValid || !pwValid))
			return null;
		if (authStatus == 'signup' && (!logValid || !pwValid || !rpwValid))
			return null;

		const formData = new FormData(e.target);
		const json = JSON.stringify(Object.fromEntries(formData.entries(formData)));
		authenSending();//start of sending data-form
		
		if (authStatus != 'signup') {
			postLogin(json)
				.then(data => {
					loginSuccess(data);
					onClose();
				}).catch(err => {
					authenError(err);
					onClose();
				})
		} else {
			postSignUp(json)
				.then(data => {
					signUpSuccess(data);
					onClose();
				}).catch(err => {
					authenError(err);
					onClose();
				})
		}
	}

		return (
			<Modal onSwitch={onClose} 
			modalRef={modalRef}>
				<AuthModalTemplate authStatus={authStatus} onAuthStatus={onAuthStatus}
					handleSubmit={handleSubmit} isLoading={isLoading} 
					onLogValid={setLogValid} onPWValid={setPWValid} 
					onRPWValid={setRPWValid} onSwitch={onClose}
					/>
			</Modal>
		);
}

const mapMethodsToProps = (belgoService) => ({
	postLogin: belgoService.postLogin,
	postSignUp: belgoService.postSignUp
});

const mapStateToProps = ({authStatus, authenSending}) => ({
	isLoading: authenSending,
	authStatus
});

const mapDispatchToProps = (dispatch) => ({
	authenSending: () => dispatch(authenSending()),
	loginSuccess: (data) => dispatch(loginSuccess(data)),
	signUpSuccess: (data) => dispatch(signUpSuccess(data)),
	authenError: (err) => dispatch(authenError(err)),
	onAuthStatus: (term) => dispatch(onAuthStatus(term))
});

export default compose(
	withBelgoService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(AuthModal);