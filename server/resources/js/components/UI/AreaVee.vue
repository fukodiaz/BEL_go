<template>
    <textarea
        v-model="value"
        :placeholder="props.placeholder"
        class="customArea"
        :class="{areaErr: errorMessage}"
        v-bind="areaAttrs"
    >
    </textarea>
    <p class='boxErrMess'>
        <span class='errMess'>
            {{ errorMessage }}
        </span>
    </p>
</template>

<script setup>
import { ref, computed } from 'vue';
import {useField} from 'vee-validate';

defineOptions({
    name: 'AreaVee'
})

const props = defineProps({
    name: {type: String, required: true},
    placeholder: {type: String},
    id: {type: String}
});

const {value, errorMessage, setValue} = useField(props.name);

//динамическое определение атрибутов (id)
const areaAttrs = computed(() => {
    const attrs = {};
    if (props.id != undefined) attrs['id'] = props.id;

    return attrs;
});

</script>

<style lang="less" scoped>
.customArea {
	display: block;
	// margin: 0px auto 20px auto;
	padding: 10px 10px;
	font-size: 17px; 
	// text-align: center;
	box-sizing: border-box;
	height: 77px;
	background:#fff;
	border-radius: 4px;
	border: 1px solid rgba(192, 192, 192, 0.8);
    overflow: auto;
    resize: none;
	&:hover {
		border: 2px solid rgba(0, 0, 0, 0.4);
	}
	&:focus, &:active {
		border: 2px solid rgba(192, 192, 192, 1);
		outline: none;
	}

    &::placeholder {
        font-size: 16px;
    }
}

.areaErr {
    border: 1px solid rgba(239, 51, 64);
    margin-bottom: 7px;
    color: rgba(239, 51, 64);
    &:hover {
		border: 2px solid rgba(239, 51, 64, .7);
	}

    &:focus, &:active {
		border: 2px solid rgba(239, 51, 64, .7);
		outline: none;
	}

    &::placeholder {
        color: rgba(239, 51, 64);
    }
}
</style>