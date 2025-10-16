<template>
    <AdminLayout title="Real estate (form page)">
        <div class="boxEstateForm">
            <EstateForm
                :item="props.item"
                :conceptions="props.conceptions"
                :cities="props.cities"
            />
        </div>
    </AdminLayout>
</template>

<script setup>
import {watch, onMounted} from 'vue';
import AdminLayout from '@/Layouts/AdminLayout.vue'
import EstateForm from '@/components/EstateForm.vue';

const props = defineProps({
    item: {type:Array, required: false},
    conceptions: {type:Array, required: false},
    cities: {type:Array, required: false},
});

onMounted(() => {
  console.log('props:', props)
  console.log('props.item:', props.item)
})

// watch(() => props.item, (item) => {
//   console.log('itemForm изменился:', item)
// })

</script>

<style lang="less" scoped>
.boxEstateForm {
    padding: 15px 15px 45px;
}

@media (min-width: 847px) {
    .boxEstateForm  {
        padding: 17px 18px 45px;
    }
}
</style>