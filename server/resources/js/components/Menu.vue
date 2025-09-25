<template>
    <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
    >
        <ul class="menuList"
            v-show="isOpen">
                <li v-for="item in arrMenu" :key="item.id" class="itemMenu">
                    <Link 
                        :href="`/admin/${item.href}`" 
                        class="linkMenu"
                        :class="{activeLinkMenu: isActiveLink(item.href)}"
                        >
                        {{ item.label }}
                    </Link>
                </li>
        </ul>
    </transition>
</template>

<script>
    import { Link } from '@inertiajs/vue3'
    import {useBurger} from '@/composables/useBurger.js'
    
    export default {
        data() {
            return {
                arrMenu: [
                    // {id: 1, label: 'Dashboard', href: ''},
                    {id: 2, label: 'Real estate', href: 'real_estate'},
                    {id: 3, label: 'Bookings', href: 'bookings'},
                    {id: 4, label: 'Users', href: 'users'},
                ]
            }
        },
        setup() {
            const {isOpen, toggleMenu} = useBurger();

            return {isOpen, toggleMenu};
        },
        methods: {
            isActiveLink(href) {
                return window.location.pathname == `/admin/${href}`;
            },
            // for transition
            isMobile() {
                return window.matchMedia('(max-width: 320px)').matches
            },
            beforeEnter(el) {
                el.style.height = '0px'
                el.style.overflow = 'hidden'
            },
            enter(el) {
                if (this.isMobile()) {
                    el.style.transition = 'height 240ms ease'
                    void el.offsetHeight
                    el.style.height = el.scrollHeight + 'px'
                } else {
                    el.style.height = 'auto'
                }
            },
            afterEnter(el) {
                el.style.height = ''
                el.style.overflow = ''
                el.style.transition = ''
            },
            beforeLeave(el) {
                if (this.isMobile()) {
                    el.style.height = el.scrollHeight + 'px'
                    el.style.overflow = 'hidden'
                    void el.offsetHeight
                    el.style.transition = 'height 200ms ease'
                }
            },
            leave(el) {
                if (this.isMobile()) {
                    el.style.height = '0px'
                } else {
                    el.style.display = 'none'
                }
            },
            afterLeave(el) {
                el.style.height = ''
                el.style.overflow = ''
                el.style.transition = ''
                if (!this.isMobile()) {
                    el.style.display = ''
                }
            }
        }
    }
</script>

<style lang="less" scoped>
 .menuList {
    // padding-top: 4px;
 }

 .itemMenu {
    font-size: 18px;
    &:first-child a {
        padding-top: 9px;
    }
 }

 .linkMenu {
    display: inline-flex;
    box-sizing: border-box;
    padding: 8px 17px;
    width: 100%;
    color: #000;
    background-color: rgba(197, 123, 130, 0.6);
    // background-color: rgba(247, 148, 60, 0.3);
    // background-color:  rgba(247, 148, 60, 0.8);
    border-bottom: 1px solid rgb(126, 123, 123);
    border-top: 2px solid rgb(255, 239, 239);
    border-radius: 3px 3px 0 0;

    &:hover {
        background-color: rgba(197, 123, 130, 0.3);
        color: #383535;
    }
 }

 .linkMenu.activeLinkMenu {
    color: rgb(48, 32, 32);
    background-color: rgba(192, 182, 183, 0.8);
 }
</style>