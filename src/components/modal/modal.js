import React, { Component } from 'react';
import { connect } from 'react-redux';

import { compose } from '../hoc';
import { withBelgoService } from '../hoc';
import { dataFormSending, dataFormSuccess, dataFormError
} from '../../actions';

import ModalBox from '../modal-box';
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

// const showMessageModal = (message) => {
// 	const modalDialog = document.querySelector('[class^="modalDialog"]');


// };

class Modal extends Component {

	state = {
		objForm: null,
		dataForm: JSON.parse(window.localStorage.getItem('dataForm')) || null,
		loadingDataForm: JSON.parse(window.localStorage.getItem('loadingDataForm')) || false,
		errorDataForm: JSON.parse(window.localStorage.getItem('errorDataForm')) || false,
		message: {
			success: "you have been successfully logged in !",
			failure: "Something went wrong..."
		},
		isSuccess: false,
		isError: false
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
			this.setState({dataForm: null, loadingDataForm: true, errorDataForm:false,
								isSuccess: false, isError: false});
			dataFormSend();
			postDataForm(json)
				.then((data) => {
					this.setState({dataForm: data, loadingDataForm: false, errorDataForm: false, 
										isSuccess: true, isError: false});
					window.localStorage.setItem('dataForm', JSON.stringify(data));
					window.localStorage.setItem('loadingDataForm', false);
					window.localStorage.setItem('errorDataForm', false);
					dataFormSucc(data);
					// console.log(data, 333333333333333);
					// console.log(this.state.dataForm, 999999999999);
					// console.log(this.props.dataFormPosted, 888888888888);
				}).catch(error => {
					this.setState({dataForm: null, loadingDataForm: false, errorDataForm: error,
										isSuccess: false, isError: true});
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
		const {dataForm, loadingDataForm, isSuccess, isError} = this.state;	

		const login = dataForm ? Object.entries(dataForm)[0][1] : "example@gmail.com";
		const password = dataForm ? Object.entries(dataForm)[1][1].replace(/./ig, '*') : "password";

		const isLoading = loadingDataForm ? <Spinner /> : null;
		console.log(dataForm, 99, login, 11, password, 22);
		
		return <ModalBox 	handleSubmit={this.handleSubmit}
								hideModal={hideModal}
								login={login} password={password}
								isLoading={isLoading}
								isSuccess={isSuccess} 
								isError={isError} />;
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