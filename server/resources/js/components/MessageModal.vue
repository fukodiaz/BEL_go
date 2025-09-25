<template>
    <div class="boxMessage">
        <h2 
            class="modalTitle"
            :class="{
                success: data.status == 'success',
                failed: data.status == 'failed'
            }"
        >
            {{ data.message }}
        </h2>
    </div>
</template>

<script>
export default {
  props: {
    data: {type: Object}
  }
}
</script>

<style lang="less" scoped>
    .success {
        color: green !important;
    }

    .failed {
        color: red !important;
    }

    .modalTitle {
        margin-bottom: 12px;
        padding-top: 2px;
        text-align: center;
        font-size: 17px;
        line-height: 24px;
        color: #4d3c3d;
        text-transform: uppercase;
    }

    @media (min-width: 847px) {
        .modalTitle {
            font-size: 20px;
		    line-height: 27px;
        }
    }
</style>