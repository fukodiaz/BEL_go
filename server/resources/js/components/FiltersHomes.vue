<template>
    <div>
        <p class="boxSearch">
            <input 
                type="search"
                v-model="search"
                @input="onSearch"
                placeholder="search"
                class="inputSearch"
            />
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: ''
        }
    },
    props: {
        updateItems: {type: Function, default: ()=>{}}
    },
    methods: {
        async onSearch() {
            // console.log('search: ', this.search)
            try {
                const response = await axios.get('/admin/real_estate/items', {
                    params: {
                        search: this.search
                    }
                });

                if (response?.data?.items?.data) {
                    this.updateItems(response?.data?.items?.data);
                }
                console.log('res: ', response?.data?.items);
            } catch (e) {
                console.log('errFiltersHomes: ', e);
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .boxSearch {
        margin-left: 25px;
    }

    .inputSearch {
        display: block;
        padding: 14px 7px;
        padding-left: 11px;
        // margin-left: 13px;
        width: 74%;
        height: 39px;
        font-size: 16px;
        border-radius: 3px;
        border: 1px solid rgba(78, 59, 49, 0.5);
        background-color: transparent;
        outline: none;
    }

    @media (min-width: 847px) {
        .boxSearch {
            margin-left: 26px;
        } 

        .inputSearch {
            width: 44%;
        }
    }
</style>