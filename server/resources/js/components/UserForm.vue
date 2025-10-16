<template>
    <h2 class="headingUserForm">
        {{ props.user?.action != 'update' ? 'Create user' : 'Edit user'}}
    </h2>
   <form @submit.prevent="onSubmit">
        <input 
            v-model="name" 
            placeholder="name"
            class="modalInput"
            :class="{inputNameErr: nameError}"
        />
        <!-- <p class='boxErrMess'>
            <span class='errMess'>
                {{ nameError }}
            </span>
        </p> -->

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

        <!-- <input 
            v-model="role"
            placeholder="role" 
            class="modalInput"
            :class="{inputRoleErr: roleError}"
        /> -->

        <CustomSelect 
            name="role"
            :options="[
                {label: 'admin', value: 'admin'},
                {label: 'renter', value: 'renter'},
                {label: 'landlord', value: 'landlord'}
            ]"
        />

        <!-- <p class='boxErrMess'>
            <span class='errMess'>
                {{ roleError }}
            </span>
        </p> -->

        <input
            v-if="userId"
            v-model="values.id"
            type="hidden"
        />

        <button 
            type="submit"
            class="modalEnter"
            >
            {{ props.user?.action != 'update' ? 'create' : 'edit' }}
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

<script setup lang="ts">
    import {ref, watch} from 'vue';
    import type { PropType } from 'vue';
    import {useModal} from '@/composables/useModal.js';
    import {useForm, useField} from 'vee-validate';
    import * as yup from 'yup';

    interface User {
        id?: number;
        name?: string;
        email?: string;
        role?: string;
        action?: string;
        updateUsers?: (newUser: User) => void;
    }

    const { openModal, closeModal } = useModal();
    const props = defineProps({
        user: {
            type: Object as PropType<User | null>,
            default: null
        }
    });

    const userId = ref(props?.user?.id ?? ''); 
    watch(() => props.user, (newUser) => {
        userId.value = newUser?.id ?? '';
    }); 

    const schema = yup.object({
        email: yup.string().required('Input email').email('Incorrect email'),
        password: yup.string().when([], {
            is: () => props.user.action == 'create',
            then: (schema) => schema.required('Input password').min(6, 'Minimum number of characters is 6'),
            otherwise: (schema) => schema.notRequired()
                                         .test(
                                         'min-if-filled',
                                         'Minimum number of characters is 6',
                                         value => !value || value.length >= 6)
        })
    });

    const {handleSubmit, values} = useForm({
        validationSchema: schema,
        initialValues: {
            name: props.user.name || '',
            email: props.user.email || '',
            password: '',
            role: props.user.role || 'renter',
            id: userId.value
        }
    });

    const {value: name, errorMessage: nameError} = useField('name');
    const {value: email, errorMessage: emailError} = useField('email');
    const {value: password, errorMessage: passwordError} = useField('password');
    // const {value: role, errorMessage: roleError} = useField('role');
    const isLoading = ref(false);
    const isError = ref(false);

    const onSubmit = handleSubmit(async (value) => {
        //console.log('Data from authForm: ', value);
        const filteredValues = Object.fromEntries(
            Object.entries(value).filter(([key, value]) => value !== '')
        );

        //console.log('filteredValues: ', filteredValues);
        // return null;

        try {
            isLoading.value = true;
            const url = '/admin/users';
            const method = props.user.action == 'create' ? 'post' : 'put';
            const messageSuccessed = method == 'post' ? 'User was created' : 'User was edited';
            const response = await axios[method](url, filteredValues);
            // console.log('res11: ', response?.data?.user)
            //change array with users
            if (props.user.updateUsers) {
                props.user.updateUsers(response?.data?.user);
            }

            closeModal();
            showMessage(messageSuccessed, 'success');
        } catch (e) {
            console.log('errUser: ', e)
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

    const showMessage = (message, status) => {
        openModal('message', {data: {message, status}});

        setTimeout(() => {
            closeModal();
        }, 4000);
    }
</script>

<style lang="less" scoped>
.headingUserForm {
    margin-top: -11px;
    padding-bottom: 23px;
    font-size: 26px;
    font-weight: 500;
    text-align: center;
}

.modalInput {
	display: block;
	margin: 0px auto 20px auto;
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

// .boxErrMess ~ input.inputPassErr,
// .boxErrMess ~ input.inputEmailErr {
//     margin-top: 15px;
// }

.inputPassErr ~ .boxErrMess,
.inputEmailErr ~ .boxErrMess {
    margin-bottom: 10px;
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