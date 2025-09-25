<template>
    <ul class="userList">
        <li class="itemUser boxBtnModalUser">
            <button class="btnModalUser"
                    @click="openModal('authForm')"
            >
                <svg width="34" height="34">
                    <!-- <use href="/icons/login.svg#login"></use> -->

                    <use href="#login"></use>
                </svg>
            </button>
        </li>
        <li class="itemUser">
            <button-menu></button-menu>
        </li>
    </ul>
</template>

<script>
// import UserIcon from '@/assets/icons/login.svg'; 
import { useModal } from '@/composables/useModal.js';

export default {
    setup() {
        const {openModal} = useModal();

        return {openModal};
    }

}
</script>

<style lang="less" scoped>
 .userList {
    display: flex;
 }

 .boxBtnModalUser {
    margin-right: 10px;
 }

 .btnModalUser {
    color: rgba(0,0,0,.7);
    background-color: transparent;

    &:hover,
    &:focus {
        color: rgba(0,0,0,.4);
    }
 }


</style>