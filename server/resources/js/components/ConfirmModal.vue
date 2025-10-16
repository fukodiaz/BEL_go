<template>
    <div class="boxConfirm">
        <h2 class="headingConfirm">
            {{ data.message }}
        </h2>

        <div class="boxBtnsConfirm">
            <button 
                class="btnConfirm"
                @click="onConfirm"
            >
                Ok
            </button>
            <button
                class="btnCancel"
                @click="onCancel"
            >
                No
            </button>
        </div>
    </div>
</template>

<script setup>
    import {useModal} from '@/composables/useModal.js';

    const { closeModal } = useModal();
    const props = defineProps({
        data: { type: Object, default: null }
    });

    const onConfirm = () => {
        props.data.action();
        // closeModal();
    }

    const onCancel = () => {
        closeModal();
    }

</script>

<style lang="less" scoped>
    .headingConfirm {
        margin-bottom: 21px;
        padding-top: 2px;
        text-align: center;
        font-size: 17px;
        line-height: 24px;
        color: #4d3c3d;
        text-transform: uppercase;
    }

    .boxBtnsConfirm {
        display: flex;
        justify-content: center;
    }

    .btnConfirm,
    .btnCancel {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 17px 37px;
        height: 27px;
        font-size: 16px;
        color: #fff;
        font-weight: 700;
        border-radius: 7px;
        background-color: #4abe50;
    }

    .btnConfirm {
        margin-right: 15px;

        &:hover,
        &:focus {
            background-color: rgba(74, 190, 80, .7);
        }
    }

    .btnCancel {
        background-color: rgba(247, 148, 60, 0.7);

        &:hover,
        &:focus {
            background-color: rgba(247, 148, 60, 0.4);
        }
    }

</style>