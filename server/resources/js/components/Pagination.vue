<template>
    <ul class="listPagin">
        <li class="arrowPrev">
            <Link  :href="hrefPrev ?? '#'"
                class="linkPagin"
                :class="{disabledLink: isDisabledLink(hrefPrev)}"
                >
                <svg width="32" height="32">
                    <use href="#arrow_prev"></use>
                </svg>
            </Link>
        </li>
        <li class="arrowNext">
            <Link  :href="hrefNext ?? '#'"
                class="linkPagin"
                :class="{disabledLink: isDisabledLink(hrefNext)}"
                >
                <svg width="32" height="32">
                    <use href="#arrow_next"></use>
                </svg>
            </Link>
        </li>
    </ul>
</template>

<script>
    import { Link } from '@inertiajs/vue3'

    export default {
        props: {
            hrefPrev: {type: String},
            hrefNext: {type: String}
        },
        methods: {
            isDisabledLink(href) {
                return href == null;
            }
        }
    }
</script>

<style lang="less" scoped>
    .listPagin {
        display: flex;
        justify-content: center;
    }

    .linkPagin {
        display: inline-flex;
    }

    .disabledLink {
        color: rgb(204, 202, 202);
    }
</style>