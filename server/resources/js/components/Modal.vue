<template>
    <div v-if="isModal" 
         class='modalContainer'
         @click.self="closeModal"
         >
        <div class="modalDialog">
            <div class="modalContent">
                <button class='modalClose'
                        @click="closeModal">
                    
                </button>
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, watch } from 'vue';
import {useModal} from '@/composables/useModal.js';

const {isModal, closeModal} = useModal();

const onKeydown = (e) => {
    if (e.key == 'Escape') {
        closeModal();
    }
};

watch(
    (val) => {
        if (val) {
            document.addEventListener('keydown', onKeydown)
        } else {
            document.removeEventListener('keydown', onKeydown)
        }
  }
);

onBeforeUnmount(() => {
    document.removeEventListener('keydown', onKeydown)
})
</script>

<style lang="less" scoped>
.modalContainer {
	// display: none;
	display: block;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1050;
	width: 100%;
	height: 100%;
	overflow: hidden;
	background-color: rgba(0,0,0, 0.5)
}

.modalDialog {
	position: absolute;
	max-width: 290px;
	left: 50%;
	transform: translateX(-50%);
	top: 40px;
	//margin: 40px auto;
}

.classDialog {
	max-width: unset;
}

.modalContent {
	position: relative;
	box-sizing: border-box;
	padding: 45px 28px 21px;
	//padding-top: 45px;
	width: 100%;
	max-height:80vh;
	overflow-y: auto;
	background-color:#fff;
	border:1px solid rgba(0,0,0,.2);
	border-radius: 4px;
	box-shadow:0 4px 20px rgba(0,0,0,.4);

	scrollbar-width: none;
	&::-webkit-scrollbar {
		width: 0px;
		height: 0px;
	}
}

.modalClose {
	position: absolute;
	top: 17px;
	right: 15px;
	width: 20px;
	height: 20px;
	border: none;
	background-color:  transparent;
	cursor: pointer;

	&:hover {
		opacity: 0.8;
	}

	&::before, &::after {
		content: "";
		position: absolute;
		left: -2px;
		top: 8px;
		width: 24px;
		height: 3px;
		background-color: rgba(0, 0, 0, 0.65);
	}
	&::before {
		transform:rotate(45deg);
	}
	&::after {
		transform:rotate(-45deg);
	}
}

@media (min-width: 768px) {
	.modalDialog {
		max-width: 350px;
	}

    .modalContent {
		padding: 45px 35px 21px;
	}

    .modalClose {
		top: 16px;
		right: 16px;
	}
}
</style>