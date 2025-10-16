<template>
    <div class="boxCustomSelect">
        <div 
            class="customSelect"
            @click="isOpen = !isOpen"
            :class="{openSelect: isOpen}"
        >
            <span class="textSelect">
                {{ options.find((option) => option.value == value)?.label || 'select..' }}
                <span class="arrow"></span>
           </span>
        </div>

        <ul
            v-if="isOpen"
            class="listOptions"
        >
            <li
                v-for="option in options"
                :key="option.value"
                @click="defOption(option)"
                class="itemOption"
            >
                {{ option.label }}
            </li>
        </ul>
    </div>
</template>

<script setup>
    import { useField } from 'vee-validate';
    import { ref } from 'vue';

    defineOptions({
        name: 'CustomSelect'
    })

    const props = defineProps({
        name: {type: String, required: true},
        options: {type: Array, required: true},
    });

    const isOpen = ref(false);
    const {value, errorMessage, setValue} = useField(props.name);

    //callback for handling item with option
    const defOption = (option) => {
        setValue(option.value);
        isOpen.value = false;
    };

</script>

<style lang="less" >
.boxCustomSelect {
    margin-bottom: 17px;  
}

.customSelect {
    width: 100%;
    min-height: 50px;   
    font-weight: 400;
    border: 1px solid rgba(192, 192, 192, 0.8);
    border-radius: 4px;
}

.customSelect:hover,
.customSelect:focus {
    border: 1px solid rgb(134, 132, 132);
    cursor: pointer;
}

.customSelect,
.itemOption {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    height: 100%;
    width: 100%;
}

.listOptions {
    margin-top: 7px;
    // border: 1px solid rgb(134, 132, 132);
    border-radius: 4px;
}

.itemOption {
    box-sizing: border-box;
    padding: 11px 12px;
    font-weight: 400;
}

.itemOption:hover,
.itemOption:focus {
    opacity: 0.7;
}

.itemOption {
    // border-top: 1px solid rgb(134, 132, 132);
    border-bottom: 1px solid rgb(134, 132, 132);
}

.itemOption:first-of-type {
    border-top: unset;
}

.itemOption:hover,
.itemOption:focus {
    cursor: pointer;
}

.textSelect {
    position: relative;
}

.arrow {
  position: absolute;
  top: 9px;
  right: -15px;
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #555353;
  transition: transform 0.35s ease;
//   transform: translateY(50%);
}

.openSelect .arrow {
    transform: rotate(180deg);
}
</style>