import {ref} from 'vue';

const isModal = ref(false);
const contentModal = ref('authForm');
const modalProps = ref({});

const closeModal = () => {
    isModal.value = false;
};

const openModal = (content, props={}) => {
    isModal.value = true;
    contentModal.value = content;
    modalProps.value = props;
};

const showMessage = (message, status) => {
    openModal('message', {data: {message, status}});

    setTimeout(() => {
        closeModal();
    }, 4000);
}

export function useModal() {
    return {
        isModal,
        closeModal,
        openModal,
        contentModal,
        modalProps,
        showMessage,
    };
}