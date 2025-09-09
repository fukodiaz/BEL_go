<template>
    <header class="mainHeader">
        <div class="innerHeader">
            <p class="boxLogo">
                <Link   href="/admin"
                        class="linkLogo">
                    Bel_go
                    
                     <!-- <svg width="87" height="87">
                        <use href="#logo-tablet-belgium"></use> 
                    </svg> -->
                </Link>
            </p>

            <user-list></user-list>
        </div>
    </header>
</template>

<script>
import UserList from './UserList.vue';
import { Link } from '@inertiajs/vue3'

export default {
    components: {
        UserList
    }
}
</script>

<style lang="less" scoped>
    .mainHeader {
        min-height: 58px;
        background-color:  rgba(247, 148, 60, 0.8);
        // background-color: rgba(247, 148, 60, 0.3);
    }

    .innerHeader {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 7px 23px;
        height: 58px;
        // background-color: rgba(197, 123, 130, 0.6);
    }

    .linkLogo {
        display: inline-flex;
        margin-bottom: 2px;
        font-family: 'Arizonia', cursive;
        font-size: 29px;
        line-height: 1.1;
        // color: rgba(105, 82, 84, 0.8);
        color: rgba(0, 0, 0, 0.7);
    }

    @media (min-width: 847px) {
        .linkLogo {
            font-size: 32px;
        }
    }
</style>