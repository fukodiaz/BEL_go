<template>
  <AdminLayout title="Users">
    <section class="innerBoxUsers">
        <div class="boxHeadUsers">
            <h2 class="headingUsers">
                Users
            </h2>
            <p class="boxAddUser">
                <button class="addUser"
                        @click="addUser"
                >
                    +addUser
                </button>
            </p>
        </div>
        <users-table
            :users="users"
        >
        </users-table>
    </section>
  </AdminLayout>
</template>

<script setup>
  import AdminLayout from '@/Layouts/AdminLayout.vue'
  import UsersTable from '@/components/UsersTable.vue';
  import {useModal} from '@/composables/useModal.js';

  const {openModal} = useModal();

  const props = defineProps({
    users: {type: Array, default: () => []}
  });

  const addUser = () => {
    const user = {action: 'create'};
    openModal('userForm', {user});
  };

  console.log('users: ', props.users);
</script>

<style lang="less" scoped>
.innerBoxUsers {
    padding: 17px 13px;
}

.boxHeadUsers {
    display: flex;
}

.headingUsers {
    display: inline-flex;
    margin-bottom: 10px;
    font-size: 25px;
    font-weight: 600;
    color: rgba(0,0,0,.8);
}

.addUser {
    margin-left: 11px;
    padding: 4px 13px 5px;
    font-size: 15px;
    color: #fff;
    border-radius: 13px;
    background: #4abe50;
}

@media (min-width: 847px) {
    .innerBoxUsers {
        padding: 18px 18px;
    }
}

@media (min-width: 1200px) {
    .innerBoxUsers {
        padding: 18px 24px;
    }
}
</style>