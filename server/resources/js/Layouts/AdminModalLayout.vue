<template>
    <main class="boxAuthPage">
        <div class="wrapperAuth">
            <div class="boxContent">
                <p class="boxLogo">
                    Bel_go
                </p>
                <slot />
            </div>
        </div>
    </main>
</template>

<script >
    export default {
        
    }
</script>

<style lang="less">
    .boxAuthPage {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 4500;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, 0.1);
        overflow: scroll;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            width: 0px;
            height: 0px;
        }
    }

    .wrapperAuth {
        position: absolute;
        max-width: 290px;
        left: 50%;
        transform: translateX(-50%);
        top: 40px;
    }

    .boxContent {   
        position: relative;
        top: 70px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .boxLogo {
        display: inline-flex;
        margin-bottom: 2px;
        font-family: 'Arizonia', cursive;
        font-size: 31px;
        line-height: 1.1;
        // color: rgba(105, 82, 84, 0.8);
        color: rgba(0, 0, 0, 0.7);
    }

    .boxContent {
        position: relative;
        box-sizing: border-box;
        padding: 27px 36px 21px;
        //padding-top: 45px;
        width: 100%;
        max-height:80vh;
        overflow-y: auto;
        background-color:#fff;
        border:1px solid rgba(0,0,0,.2);
        border-radius: 4px;
        box-shadow:0 4px 20px rgba(0,0,0,.4);

        scrollbar-width: none;
        &::-webkit-scrollbar {
            width: 0px;
            height: 0px;
        }
    }

    .classDialog {
        max-width: unset;
    }

    @media (min-width: 847px) {
        .wrapperAuth {
            max-width: 350px;
        }
    }
</style>