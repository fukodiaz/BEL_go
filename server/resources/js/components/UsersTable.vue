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
                    v-for="(user, idx) in users"
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
const {openModal} = useModal();

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
        }
    },
    props: {
        users: {type: Array, default: () => []}
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
            user = {...user, action: 'update'};
            openModal('userForm', {user});
            console.log('edit.user: ', user);
        },
        deleteUser(id) {
            console.log('delete.user: ', id)
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