<template>
    <div>
        <table class="tableUsers">
            <thead>
                <tr class="trHeadUser">
                    <th 
                        v-for="column in defColumns()"
                        :key="column.id"
                        class="thUsers"
                    >
                        {{ column.label }}
                    </th>
                    <th class="thUsers">
                        tools
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr class="trBodyUser"
                    v-for="(user, idx) in arrUsers"
                    :key="user.id"
                >
                    <td class="tdUser"
                        v-for="column in defColumns()">
                        {{ column.id != 'id' ? user[`${column.id}`] : idx+1}}
                    </td>
                    <td class="tdUser">
                        <ul class="listTools">
                            <li class="itemTools">
                                <button class="btnEditUser"
                                        @click="editUser(user)"
                                >
                                    <svg width="22" height="22">
                                        <use href="#pencil"></use>
                                    </svg>
                                </button>
                            </li>
                            <li class="itemTools">
                                <button class="btnDeleteUser"
                                        @click="deleteUser(user.id)"
                                >
                                    <svg width="22" height="22">
                                        <use href="#trash"></use>
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { useUtils } from '@/composables/useUtils';
import {useModal} from '@/composables/useModal.js';

const {isMobile} = useUtils();
const {openModal, closeModal} = useModal();

export default {
    data() {
        return {
            columnsMobil: [
                {id: 'id', label: '#'},
                {id: 'email', label: 'email'},
            ],
            columns: [
                {id: 'id', label: '#'},
                {id: 'email', label: 'email'},
                {id: 'name', label: 'name'},
                {id: 'role', label: 'role'}
            ],
            arrUsers: [...this.users],
        }
    },
    props: {
        users: {type: Array, default: () => []}
    },
    watch: {
        users(newVal) {
            this.arrUsers =  [...newVal];
        }
    },
    methods: {
        defColumns() {
            if (isMobile()) {
                return this.columnsMobil;
            } else {
                return this.columns;
            }
        },
        editUser(user) {
            user = {...user,
                    action: 'update', 
                    updateUsers:(user) => this.updateUsers(user)
                   };
            openModal('userForm', {user});
            //console.log('edit.user: ', user);
        },
        deleteUser(id) {
            const message = 'Do you really want to delete this user?';
            openModal('confirm', {
                data: {
                    message,
                    action: () => this.onDelete('/admin/users', id)
                }
            });

            // console.log('delete.user: ', id);
        },
        async onDelete(url, id) {
            try {
                const response = await axios.delete(url, { data: {id} });

                this.showMessage('User was deleted', 'success');
                this.arrUsers = this.arrUsers.filter(user => user.id != id);
            } catch (e) {
                console.log('errUser: ', e)
                const mess = e?.message;
                if (mess) {
                    this.showMessage("Couldn't delete user", 'failed');
                }
            }
        },
        updateUsers(newUser) {
            const index = this.arrUsers.findIndex(u => u.id === newUser.id);

            if (index !== -1) {
                // update existing user
                this.arrUsers.splice(index, 1, newUser);
            } else {
                //add new user
                this.arrUsers.push(newUser);
            }
        },
        showMessage(message, status) {
            openModal('message', {data: {message, status}});

            setTimeout(() => {
                closeModal();
            }, 3000);
        },
        provideFn() {
            // emit function to parent
            this.$emit("provide-fn", this.updateUsers);
        }
    }
} 
</script>

<style lang="less" scoped>
.tableUsers {
    border-collapse: collapse;
    min-width: 60%;
    max-width: 100%;
}

.trHeadUser {
    background-color: rgb(77, 60, 61);
}

.thUsers {
    padding: 3px 27px 4px;
    font-size: 16px;
    color: #fff;
    border-right: 2px solid #E3E6EC;

    &:first-of-type {
        padding: 3px 11px 4px;
        border-left: 1px solid rgb(77, 60, 61);
    }
    
    &:last-of-type {
        border-right: 1px solid rgb(77, 60, 61);
    }
}

.tdUser {
    padding: 4px 11px 5px;
    font-size: 16px;
    text-align: center;
    border: 2px solid #e9e9ee;
    // background-color: #fff;
    
     &:first-of-type {
        padding: 3px 7px 4px;
        
    }
}

.listTools {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1px;
}

.itemTools {
    display: flex;
    align-items: center;
    &:not(:last-of-type) {
        margin-right: 2px;
    }

    & button {
        &:hover,
        &:focus {
            color: rgba(0,0,0,.6);
        }
    }
}

</style>