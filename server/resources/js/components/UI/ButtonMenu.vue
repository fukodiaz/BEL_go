<template>
   <button  class="btnMenu burger"
            :class="{active: isOpen}"
            @click="toggleMenu"
   >
   </button>
</template>

<script>
import {useBurger} from '@/composables/useBurger.js'

export default {
    name: 'button-menu',
    setup() {
        const {isOpen, toggleMenu} = useBurger();

        return {isOpen, toggleMenu};
    }
}
</script>

<style lang="less" scoped>
    .btnMenu {
        margin-top: 5px;
        width: 44px;
        height: 44px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 6px;
        border: none;
        background: transparent;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
    }

    .burger {
        cursor: pointer;
        display: block;
        position: relative;
        border: none;
        background: transparent;
        width: 30px;
        height: 26px;
        // margin: 30px auto;
    }

    .burger::before,
    .burger::after {
        content: '';
        left: 0;
        position: absolute;
        display: block;
        width: 100%;
        height: 3px;
        border-radius: 10px;
        background: #000;

        &:hover,
        &:focus {
            background-color: rgba(0,0,0,0, .7);
        }
    }

    .burger::before {
        top: 0;
        box-shadow: 0 10px 0 #000;
        transition: box-shadow .3s .15s, top .3s .15s, transform .3s;

        &:hover,
        &:focus {
            box-shadow: 0 10px 0 rgba(0,0,0,0, .7);
        }
    }

    .burger::after {
        bottom: 3px;
        transition: bottom .3s .15s, transform .3s;
    }

    .burger.active::before {
        top: 9px;
        transform: rotate(45deg);
        box-shadow: 0 6px 0 rgba(0,0,0,0);
        transition: box-shadow .15s, top .3s, transform .3s .15s;
    }

    .burger.active::after {
        bottom: 11px;
        transform: rotate(-45deg);
        transition: bottom .3s, transform .3s .15s;
    }


    .burger.active::before {
        top: 11px;
        transform: rotate(45deg);
        box-shadow: none;
        width: calc(100% + 5px);
        left: -2px;
    }

    .burger.active::after {
        bottom: 11px;
        transform: rotate(-45deg);
        width: calc(100% + 5px);
        left: -2px;
    }

    .burger:hover:not(.active)::before,
    .burger:hover:not(.active)::after,
    .burger:focus:not(.active)::before,
    .burger:focus:not(.active)::after {
        background: #555;
    }

    .burger:not(.active)::before {
        box-shadow: 0 10px 0 #000;
        transition: box-shadow 0.3s, background-color 0.3s;
    }

    .burger:hover:not(.active)::before,
    .burger:focus:not(.active)::before {
        box-shadow: 0 10px 0 #555;
    }

    @media (min-width: 321px) {
        .btnMenu {
            display: none;
        }
    }

</style>