<template>
    <input
        v-model="value"
        :placeholder="props.placeholder"
        :type="props.type"
        class="customInput"
        :class="{inputErr: errorMessage}"
        v-bind="inputAttrs"
    />
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
    name: 'InputVee'
})

const props = defineProps({
    name: {type: String, required: true},
    type: {type: String, default: 'text'},
    id: {type: String},
    placeholder: {type: String},
    min: [String, Number],
    max: [String, Number],
    step: [String],
});

const {value, errorMessage, setValue} = useField(props.name);

//динамическое определение атрибутов min/maxs, id
const inputAttrs = computed(() => {
    const attrs = {};
    if (props.type == 'number' || props.type == 'date') {
        if (props.min != undefined) attrs['min'] = props.min;
        if (props.max != undefined) attrs['max'] = props.max;
        if (props.step != undefined) attrs['step'] = props.step;
    }
    if (props.id != undefined) attrs['id'] = props.id;

    return attrs;
});

</script>

<style lang="less">
.customInput {
	display: block;
	// margin: 0px auto 20px auto;
	padding: 0 10px;
	font-size: 17px; 
	// text-align: center;
	box-sizing: border-box;
	// width: 240px;
	height: 40px;
	background:#fff;
	border-radius: 4px;
	border: 1px solid rgba(192, 192, 192, 0.8);
	&:hover {
		border: 2px solid rgba(0, 0, 0, 0.4);
	}
	&:focus, &:active {
		border: 2px solid rgba(192, 192, 192, 1);
		outline: none;
	}
}

.inputErr {
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

.boxErrMess {
    position: relative;
    margin-top: 0px;
    margin-left: 2px; 
}

.errMess {
    font-size: 16px;
    color: rgba(239, 51, 64);
}
</style>