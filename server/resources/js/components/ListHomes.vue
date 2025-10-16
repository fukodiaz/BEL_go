<template>
    <ul class="listHomes">
        <li v-for="(item, idx) in arrItems" :key="idx"
            class="itemHome"
            >
          <ItemHome v-bind="item" 
                    :concept_label="item?.concept?.label"
                    :updateHomes="updateHomes"
           />
        </li>
    </ul>
</template>

<script>
import ItemHome from '@/components/ItemHome.vue';

export default {
    components: { ItemHome },
    props: {
        items: {type: Array, default: () => []}
    },
    data() {
      return {
        arrItems: [...this.items],
      }
    },
    watch: {
      items(newItems) {
        this.arrItems = [...newItems];
      }
    },
    methods: {
      updateHomes(idx) {
        const index = this.arrItems.findIndex(item => item.id === idx);
        if (index !== -1) {
            // update array with real estate
            this.arrItems.splice(index, 1);
        } 
      }
    },
    // mounted() {
    //     console.log('itemsss: ', this.items);
    // }
}

// console.log('itemsss: ', this.items);
</script>

<style lang="less" scoped>
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