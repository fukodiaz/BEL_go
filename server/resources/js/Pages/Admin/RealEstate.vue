<template>
  <AdminLayout title="Real estate">
    <div class="boxHeadEstate">
      <h2 class="headingEstate">Real Estate</h2>

      <p class="boxAddEstate">
        <button class="addEstate"
                @click="addEstate"
        >
            +addItem
        </button>
      </p>
    </div>

    <div class="boxFilters">
      <FiltersHomes 
        :updateItems="updateItems"
      />
    </div>
    
    <div class="boxHomes">
      <ListHomes 
        :items="stateItems"
      />
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
  import FiltersHomes from '@/components/FiltersHomes.vue';
  import ListHomes from '@/components/ListHomes.vue';
  import Pagination from '@/components/Pagination.vue';
  import { router } from '@inertiajs/vue3'
  import {ref} from 'vue';

  const props = defineProps({ 
    items: {type: Array,  default: () => []} 
  })

  // const stateItems = ref([...props.items]);  
  const stateItems = ref([...props.items.data]);  

  const updateItems = (newItems) => {
    stateItems.value = newItems;
  };

  const addEstate = () => {
    router.visit('/admin/real_estate/form');
  };

  // console.log('newArrItems: ', props.items);
  console.log('items: ', props.items);
</script>

<style lang="less">
  .boxHeadEstate {
    display: flex;
    align-items: center;
    margin-bottom: 9px;
  }

  .headingEstate {
    display: inline-flex;
    margin-bottom: 10px;
    margin-left: 17px;
    padding-top: 15px;
    font-size: 25px;
    font-weight: 600;
    color: rgba(0,0,0,.8);
  }

  .boxAddEstate {
    position: relative;
    margin-top: 4px;
  }

  .addEstate {
    margin-left: 11px;
    padding: 4px 13px 5px;
    font-size: 15px;
    color: #fff;
    border-radius: 13px;
    background: #4abe50;
  }

  .boxFilters {
    margin-bottom: 18px;
  }

  .listHomes {
    padding: 0 10px;
  }

  .itemHome {
    max-width: 300px;
    margin-bottom: 15px;
  }

  @media (min-width: 847px) {
    .boxHeadEstate {
      margin-bottom: 15px;
    }

    .headingEstate {
      margin-bottom: 10px;
      margin-left: 25px;
    }

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