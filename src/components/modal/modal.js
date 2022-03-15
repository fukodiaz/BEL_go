import React, { Component } from 'react';
import { connect } from 'react-redux';

import { compose } from '../hoc';
import { withBelgoService } from '../hoc';
import { 
	dataFormSending,
	dataFormSuccess,
	dataFormError
} from '../../actions';

import Spinner from '../spinner';
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

class Modal extends Component {

	state = {
		objForm: null,
		dataForm: JSON.parse(window.localStorage.getItem('dataForm')) || null,
		loadingDataForm: JSON.parse(window.localStorage.getItem('loadingDataForm')) || false,
		errorDataForm: JSON.parse(window.localStorage.getItem('errorDataForm')) || false
	};

	componentDidMount() {
		const modalBox = document.querySelector('[class^="modalBox"]');

		const onKeydown = (e) => {
			if (e.code === 'Escape' && modalBox.classList.contains(`${styles.modalShow}`)) {
				hideModal('[class^="modalBox"]');
			}
		}

		document.addEventListener('keydown', onKeydown);
		//return () => document.removeEventListener("keydown", onKeydown);
	}

	componentDidUpdate(prevProps, prevState) {
		const {postDataForm, dataFormSend, dataFormSucc, dataFormErr, dataFormPosted} = this.props;
		const { objForm } = this.state;

		if (JSON.stringify(objForm) !== JSON.stringify(prevState.objForm)) {

			const json = JSON.stringify(objForm);
			this.setState({dataForm: null, loadingDataForm: true, errorDataForm:false});
			dataFormSend();
			postDataForm(json)
				.then((data) => {
					this.setState({dataForm: data, loadingDataForm: false, errorDataForm: false});
					window.localStorage.setItem('dataForm', JSON.stringify(data));
					window.localStorage.setItem('loadingDataForm', false);
					window.localStorage.setItem('errorDataForm', false);
					dataFormSucc(data);
					// console.log(data, 333333333333333);
					// console.log(this.state.dataForm, 999999999999);
					// console.log(this.props.dataFormPosted, 888888888888);
				}).catch(error => {
					this.setState({dataForm: null, loadingDataForm: false, errorDataForm: error});
					window.localStorage.setItem('dataForm', null);
					window.localStorage.setItem('loadingDataForm', false);
					window.localStorage.setItem('errorDataForm', JSON.stringify(error));
					dataFormErr(errorDataForm);
					console.log(error);
				});
		}
	}
	
	handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const objForm = Object.fromEntries(formData.entries(formData));
		this.setState({objForm});
	}

	render() {
		const {dataForm} = this.state;	
		const login = dataForm ? Object.entries(dataForm)[0][1] : "example@gmail.com";
		const password = dataForm ? Object.entries(dataForm)[1][1] : "password";
		console.log(dataForm, 99, login, 11, password, 22);
		
		return (
			<div className={styles.modalBox}
					onClick={ (e) => onClickModalBox('[class^="modalBox"]', e) }>
					
				<div className={styles.modalDialog}>
					<div className={styles.modalContent}>
						
						<form onSubmit={this.handleSubmit} >
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
					</div>
				</div>
			</div>
		);
	}
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
	dataFormErr: (error) => dispatch(dataFormError(error))
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