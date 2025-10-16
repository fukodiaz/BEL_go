<template>
  <div class="mainWrapper">
    <!-- Контент -->
    <div class="flex-1 flex flex-col">
      <!-- Шапка -->
      <main-header></main-header>

      <!-- Основной контент -->
      <main class="mainContainer">
        <nav class="boxMenu">
          <Menu />
        </nav>
        <div class="boxPage">
          <slot />
        </div>
      </main>

      <Modal>
        <component 
          :is="defContentModal"
          v-bind="modalProps"
        />
      </Modal>
    </div>
  </div>
</template>

<script setup>
// import { Link } from '@inertiajs/vue3'
import { computed } from 'vue';
import MainHeader from '@/components/MainHeader.vue';
import Menu from '@/components/Menu.vue';
import Modal from '@/components/Modal.vue';
import AuthForm from '@/components/AuthForm.vue';
import UserForm from '@/components/UserForm.vue';
import MessageModal from '@/components/MessageModal.vue';
import ConfirmModal from '@/components/ConfirmModal.vue';
import {useModal} from '@/composables/useModal.js';

const {isModal, contentModal, modalProps} = useModal();

defineProps({
  title: {
    type: String,
    default: 'Админка'
  }
})

const defContentModal = computed(() => {
  switch(contentModal.value) {
    case 'authForm':
      return AuthForm;
    case 'userForm':
      return UserForm;
    case 'message':
      return MessageModal;
    case 'confirm':
      return ConfirmModal;

    default:
      return AuthForm;
  }
});

</script>

<style lang="less">
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Arizonia&display=swap');

  body {
    min-width: 320px;
    margin: 0;
    margin-right: calc(-1 * (100vw - 100%));
    padding: 0;
    font-size: 18px;
    line-height: 24px;
    font-family:  'Inter', 'Helvetica', sans-serif;
    color: #000000;
    font-style: normal;
    background-color: #f2f2f2;
    overflow-x: hidden;
  }


  img {
    max-width: 100%;
    height: auto;
  }

  h1, h2, h3, p, div  {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  button {
    padding: 0;
    box-sizing: border-box;
    border: none;
    font-family:  'Inter', 'Helvetica', sans-serif;
    text-decoration: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
  }

  .mainWrapper {
    max-width: 320px;
    margin: 0 auto;
    background-color: #fcfcee;
  }

  .mainContainer {
    min-height: 80vh;
  }

  .boxMenu {
    background-color:  rgba(247, 148, 60, 0.3);
  }

  @media (min-width: 847px) {
    .mainWrapper {
      // max-width: 768px;
      max-width: 847px;
    }

    .mainContainer {
      display: flex;
    }

    .boxMenu {
      flex-basis: 24%;
    }

    .boxPage {
      flex-basis: 76%;
    }

  }

  @media (min-width: 1280px) {
    .mainWrapper {
      max-width: 1280px;
    }

    .boxMenu {
      // flex-basis: 25%;
      flex-basis: 22%;
    }

    .boxPage {
      // flex-basis: 75%;
      flex-basis: 78%;
    }
  }
</style>