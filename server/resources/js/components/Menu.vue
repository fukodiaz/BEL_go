<template>
   <ul class="menuList">
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
</template>

<script>
    import { Link } from '@inertiajs/vue3'
    
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
        methods: {
            isActiveLink(href) {
                return window.location.pathname == `/admin/${href}`;
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