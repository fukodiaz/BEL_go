<template>
    <ul class="userList">
        <li class="itemUser boxBtnModalUser">
            <button class="btnModalUser">
                <svg width="32" height="32">
                    <!-- <use href="/icons/login.svg#login"></use> -->

                    <use href="#login"></use>
                </svg>
            </button>
        </li>
        <!-- <li class="itemUser">
            <button class="btnMenu">

            </button>
        </li> -->
    </ul>
</template>

<script>
// import UserIcon from '@/assets/icons/login.svg'; 

export default {
    

}
</script>

<style lang="less" scoped>
 .btnModalUser {
    color: red;
    background-color: transparent;
 }

</style>