import React, {useEffect, useState, useRef} from 'react';

import Spinner from '../spinner';
import styles from './auth-modal-template.m.less';

const AuthModalTemplate = (props) => {
	const {handleSubmit, isLoading, authStatus, onAuthStatus,
			onLogValid, onPWValid, onRPWValid, onSwitch=()=>{},
			errModal, setErrModal} = props;

	//switch to signup/login
	const [isLog, setIsLog] = useState(true);
	const refRepeat = useRef(null);
	useEffect(() => {
		if (authStatus != 'signup')
			setIsLog(true);
		else
			setIsLog(false);
		setLogValid(true);
		setPWValid(true);
		setRPWValid(true);
		setPassword('');
	}, [authStatus])

	//control value of inputs
	const [login, setLogin] = useState('');
	const [password,setPassword] = useState('');
	const [logValid, setLogValid] = useState(true);
	const [pwValid, setPWValid] = useState(true);
	const [rpwValid, setRPWValid] = useState(true);

	useEffect(() => {
		if (!isLog)
			refRepeat.current.value = '';
	}, [isLog])

	useEffect(() => {
		if (errModal) {
			setTimeout(function() {
				setErrModal(null);
			}, 4000)
		}
	}, [errModal])

	const onChangeLogin = (e) => {
		setLogin(e.target.value)
		if (e.target.value.trim() != '') {
			onLogValid(true)
			setLogValid(true)
		} else {
			onLogValid(false)
			setLogValid(false)
		}
	}
	const onChangePW = (e) => {
		setPassword(e.target.value)
		const regExp = /^[0-9a-zA-Z]{6,}$/;
		if (regExp.test(e.target.value.trim())) {
			onPWValid(true)
			setPWValid(true)
		} else {
			onPWValid(false)
			setPWValid(false)
		}
		if (!isLog && refRepeat.current.value.trim() === e.target.value.trim()) {
			onRPWValid(true)
			setRPWValid(true)
		} else {
			onRPWValid(false)
			setRPWValid(false)
		}
	}
	const onChangeRPW = (e) => {
		if (e.target.value.trim() === password.trim()) {
			onRPWValid(true)
			setRPWValid(true)
		} else {
			onRPWValid(false)
			setRPWValid(false)
		}
	}

	//spinner on/off
	const [isLoad, setIsLoad] = useState(false)
	useEffect(() => {
		setIsLoad(isLoading)
	}, [isLoading])

	return (
		<div className={styles.modalContent}>
			<form onSubmit={handleSubmit} >
				<button className={styles.modalClose} type='button'
							onClick={onSwitch} />
				<p className={styles.modalTitle}>
					please enter your email and password
				</p>
				{/* placeholder="your login" */}
				<input 	type="text" name="email" value={login} 
							onChange={onChangeLogin} placeholder="your email" required
							className={logValid ? styles.modalInput : styles.modalInvalid} />
				<input 	type="password" name="password" value={password} 
							onChange={onChangePW} placeholder="password" required
							className={pwValid ? styles.modalInput : styles.modalInvalid} />
				{
					!pwValid && 
						<p className={styles.pwInvalid}>This password is too short</p>
				}
				{ !isLog && <input type="password" name="repeat_pw" ref={refRepeat}
								onChange={onChangeRPW} placeholder="repeat password" required
								className={rpwValid ? styles.modalInput : styles.modalInvalid}
								style={{marginTop: !pwValid ? '0px' : '20px'}}/>
				}
				{
					isLog ? (
						<p className={styles.qSwitch}>
							Create a<span onClick={()=>onAuthStatus('signup')}
												className={styles.spanAuth}>
										new account</span>?
						</p>) : (
							<p className={styles.qSwitch}>
								Need to <span onClick={()=>onAuthStatus('login')}
													className={styles.spanAuth}>
											sign in</span>?
							</p>
						)
				}
				<button className={styles.modalEnter} type="submit">
					{isLog ? 'sign in' : 'sign up'}
				</button>
			</form>
			{isLoad ? <Spinner /> : null}
			{errModal ? 
				<p class={styles.boxErrModal}>
					<span class={styles.textErrModal}>
						{errModal}
					</span>
				</p> 
				:null}
		</div>
	);
};


export default AuthModalTemplate;