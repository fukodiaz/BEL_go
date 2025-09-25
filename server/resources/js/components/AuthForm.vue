<template>
    <form @submit.prevent="onSubmit">
        <input 
            v-model="email" 
            placeholder="email"
            class="modalInput"
            :class="{inputEmailErr: emailError}"
            />
        <p class='boxErrMess'>
            <span class='errMess'>
                {{ emailError }}
            </span>
        </p>

        <input 
            v-model="password" 
            type="password" 
            placeholder="password" 
            class="modalInput"
            :class="{inputPassErr: passwordError}"
            />
        <p class='boxErrMess'>
            <span class='errMess'>
                {{ passwordError }}
            </span>
        </p>

        <button 
            type="submit"
            class="modalEnter"
            >
            Login
        </button>
    </form>
    <spinner :isLoading="isLoading"></spinner>
    <div    v-show="isError"
            class='boxErrMess boxErrMessSent'>
        <span class='errMess'>
            {{ isError }}
        </span>
    </div>
</template>

<script setup>
   import { ref } from "vue";
   import { router } from '@inertiajs/vue3'
   import {useForm, useField} from 'vee-validate';
   import * as yup from 'yup';
   
   const schema = yup.object({
        email: yup.string().required('Input email').email('Incorrect email'),
        password: yup.string().required().min(6, 'Minimum number of characters is 6')
   });

   const {handleSubmit} = useForm({validationSchema: schema});
   const {value: email, errorMessage: emailError} = useField('email');
   const {value: password, errorMessage: passwordError} = useField('password');
   const isLoading = ref(false);
   const isError = ref(false);

   const onSubmit = handleSubmit(async (value) => {
        // console.log('Data from authForm: ', value);

        try {
            isLoading.value = true;
            const response = await axios.post('/admin/login', value);
            console.log('dataLogin: ', response);

            router.visit('/admin');
            
        } catch (e) {
            console.log('errLogin: ', e)
            const mess = e?.message;
            if (mess) {
                showError(mess);
            }
        } finally {
            isLoading.value = false;
        }
   });

   const showError = (error) => {
        isError.value = error;
        
        setTimeout(() => {
            isError.value = false;
        }, 4000);
   };
</script>

<style lang="less" scoped>
.modalInput {
	display: block;
	margin: 20px auto 20px auto;
	padding: 0 20px;
	font-size: 17px; 
	text-align: center;
	box-sizing: border-box;
	width: 240px;
	height: 50px;
	background:#fff;
	border-radius: 4px;
	border: 1px solid rgba(192, 192, 192, 0.8);
	&:hover {
		border: 2px solid rgba(0, 0, 0, 0.4);
	}
	&:focus, &:active {
		border: 2px solid rgba(192, 192, 192, 1);
		outline: none;
	}
}

.inputEmailErr,
.inputPassErr {
    border: 1px solid rgba(239, 51, 64);
    margin-bottom: 7px;
    color: rgba(239, 51, 64);
    &:hover {
		border: 2px solid rgba(239, 51, 64, .7);
	}

    &:focus, &:active {
		border: 2px solid rgba(239, 51, 64, .7);
		outline: none;
	}
}

.inputPassErr ~ button {
    margin-top: 15px;
}

.boxErrMess {
    display: flex;
    justify-content: center;
    padding-left: 9px;
}

.boxErrMessSent {
    margin-top: 15px;
}

.errMess {
    font-size: 16px;
    color: rgba(239, 51, 64);
    text-align: center;
}

.boxErrMess ~ input {
    margin-top: 15px;
}

.modalEnter {
	display: block;
	padding: 13px 65px;
	margin: 0 auto 13px;
	font-size: 16px;
	color: #fff;
	font-weight: 700;
	text-transform: uppercase;
	border-radius: 5px;
	background-color: rgba(247, 148, 60, 0.9);
	&:hover {
		background-color: rgba(247, 148, 60, 0.6);
	}
	&:active {
		background-color: rgba(247, 148, 60, 0.6);
	}
}

.boxErrMess {

}

@media (min-width: 847px) {
    .modalInput {
        width: 260px;
    }
}
</style>