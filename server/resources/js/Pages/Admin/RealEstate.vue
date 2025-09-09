<template>
  <AdminLayout title="Real estate">
    <h2 class="text-2xl font-bold mb-4">RealEstateee</h2>
    
    <div class="boxHomes">
      <ul class="listHomes">
        <li v-for="(item, idx) in stateItems" :key="idx"
            class="itemHome"
            >
          <ItemHome v-bind="item" :concept_label="item?.concept?.label" />
        </li>
      </ul>
    </div>
    <div class="boxPagination">
      <Pagination
          :hrefPrev="items.prev_page_url"
          :hrefNext="items.next_page_url"
          />
    </div>
  </AdminLayout>
</template>

<script setup>
  import AdminLayout from '@/Layouts/AdminLayout.vue'
  import ItemHome from '@/components/ItemHome.vue';
  import Pagination from '@/components/Pagination.vue';
  import {ref} from 'vue';

  const props = defineProps({ 
    items: {type: Array,  default: () => []} 
  })

  // const stateItems = ref([...props.items]);  
  const stateItems = ref([...props.items.data]);  


  function save() {
    // console.log('items: ', stateItems.value);
    console.log('items: ', stateItems.data);
  }

  // console.log('newArrItems: ', props.items);
  console.log('items: ', props.items);

  console.log('prev: ', props.items.prev_page_url);

  //next_page_url
  //prev_page_url
</script>

<style lang="less">
  .listHomes {
    padding: 0 10px;
  }

  .itemHome {
    max-width: 300px;
    margin-bottom: 15px;
  }

  @media (min-width: 847px) {
    .listHomes {
      display: grid;
      //grid-template-columns: repeat(2, 1fr);
      grid-template-columns: repeat(auto-fit, minmax(300px, auto));
      gap: 15px;
      padding: 0 12px;
      justify-content: center;
    }
  }

@media (min-width: 1280px) {
  .listHomes {
    gap: 18px;
  }
}
</style>