import {ref} from 'vue'

const isOpen = ref(false);

 function isMobile() {
    return window.matchMedia('(max-width: 320px)').matches
}

if (!isMobile()) {
    isOpen.value = true;
}

function toggleMenu() {
    isOpen.value = !isOpen.value;
}

function closeMenu() {
    isOpen.value = false;
}

export function useBurger() {
    return {
        isOpen, 
        toggleMenu, 
        closeMenu
    };
}