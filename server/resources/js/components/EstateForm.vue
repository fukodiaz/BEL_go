<template>
    <h2 class="headingEstateForm">
        {{ props?.item ? 'Edit real estate' : 'Create real estate'}}
    </h2>
    
    <form
        @submit.prevent="onSubmit"
        class="formEstate"
    >
        <div class="boxInput">
            <label  class="labelInput"
                    for="slug">
                Slug:
            </label>
            <InputVee 
                name="slug"
                id="slug"
                placeholder="slug"
                type="text"
            />
        </div>

        <div class="boxInput">
             <label  class="labelInput"
                     for="descr">
                Short description:
            </label>
            <AreaVee
                name="descriptionShort"
                id="descr"
                placeholder="description.."
            />
        </div>

        <div class="boxInput">
            <label  class="labelInput"
                    for="inf">
                Information:
            </label>
            <AreaVee
                name="information"
                id="inf"
                placeholder="information.."
            />
        </div>

        <div class="boxSelect">
            <p class="labelSelect">
                City:
            </p>
            <CustomSelect 
                name="city_id"
                :options="arrCities"
            />
        </div>

        <div class="boxInput">
            <label  class="labelInput"
                    for="lat">
                Address (lat):
            </label>
            <InputVee 
                name="address_lat"
                id="lat"
                placeholder="address_lat"
                type="number"
                step="any"
            />
        </div>

        <div class="boxInput">
            <label  class="labelInput"
                    for="lng">
                Address (lng):
            </label>
            <InputVee 
                name="address_lng"
                id="lng"
                placeholder="address_lng"
                type="number"
                step="any"
            />
        </div>

        <div class="boxSelect">
            <p class="labelSelect">
                Conception:
            </p>
            <CustomSelect 
                name="conception_id"
                :options="arrConceptions"
            />
        </div>

        <div class="boxInput">
            <label  class="labelInput"
                    for="price"    
            >
                Price:
            </label>
            <InputVee 
                name="price"
                id="price"
                placeholder="price"
                type="number"
                min="10"
                step="any"
            />
        </div>

        <div class="boxInput">
            <label  class="labelInput"
                    for="imageIntro"    
            >
                Image intro (file name):
            </label>
            <InputVee 
                name="imageIntro"
                id="imageIntro"
                placeholder="file.jpg"
            />
        </div>

        <div class="boxInput">
            <label  class="labelInput"
                    for="imageDetails"    
            >
                Image details (file name):
            </label>
            <InputVee 
                name="imageDetails"
                id="imageDetails"
                placeholder="file.jpg"
            />
        </div>

        <div class="boxBtnEstate">
            <button 
                type="submit"
                class="estateSubmit"
                >
                {{ props?.item ? 'edit' : 'create' }}
            </button>
            
            <div class="boxLoading">
                <spinner :isLoading="isLoading"></spinner>
            </div>
        </div>
    </form>
</template>

<script setup>
import {ref} from 'vue';
import {useForm} from 'vee-validate';
import * as yup from 'yup';
import {useModal} from '@/composables/useModal.js';

const isLoading = ref(false);
const {showMessage} = useModal();

const props = defineProps({
    item: {type: Array, default: null},
    conceptions: {type: Array},
    cities: {type: Array}
});

const imageExtensionTest = () => yup.string()
                                    .test(
                                        'extension',
                                        'Wrong file extension',
                                        (value) => {
                                            if (!value) return true;
                                            return /\.(png|jpg|jpeg)$/i.test(value);
                                        }
                                    );

const schema = yup.object({
    slug: yup.string().required('Input slug'),
    descriptionShort: yup.string().required('Input description'),
    information: yup.string(),
    address_lat: yup.number().required('Input address lat'),
    address_lng: yup.number().required('Input address lng'),
    price: yup.number().required('Input price').min(10, 'Minimum price is 10'),
    imageIntro: imageExtensionTest(),
    imageDetails: imageExtensionTest(),
});

const {handleSubmit, resetForm} = useForm({
    validationSchema: schema,
    initialValues: {
        slug: props?.item?.slug || '',
        descriptionShort: props?.item?.descriptionShort || '',
        information: props?.item?.information || '',
        city_id: props?.item?.city_id || 1,
        conception_id: props?.item?.conception_id || 1,
        address_lat: props?.item?.address?.lat || 0,
        address_lng: props?.item?.address?.lng || 0,
        price: props?.item?.price || 10,
        imageIntro: props?.item?.imageIntro || '',
        imageDetails: props?.item?.imageDetails || '',
        id: props?.item?.id || '',
    }
});

//send data from form real estate
const onSubmit = handleSubmit(async (value) => {
    // console.log('estateForm: ', value);
    try {
        isLoading.value = true;
        const url = '/admin/real_estate';
        const method = props?.item ? 'put' : 'post';
        const messageSuccessed = method == 'post' ? 'Real estate was created' : 'Real estate was edited';
        const response = await axios[method](url, value);
        // console.log('res11: ', response?.data?.estate)

        //if it was created then reset form and show modal with message
        if (method == 'post') resetForm();
        showMessage(messageSuccessed, 'success');
    } catch (e) {
        // console.log('errUser: ', e)
        let mess = e?.response?.data?.message;
        mess = mess ? mess : e?.message ? e?.message : 'Something went wrong';
        
        showMessage(mess, 'failed');
    } finally {
        isLoading.value = false;
    }
});

//prepare arrays-options for cities and conceptions
const arrCities = ref([]);
const arrConceptions = ref([]);

//map arrays for select-options
const mapOption = (item) => {
    return {
        'value': item?.id,
        'label': item?.label
    };
}

if (props.cities && props.cities.length > 0) {
  arrCities.value = props.cities.map(mapOption)
}

if (props.conceptions && props.conceptions.length > 0) {
  arrConceptions.value = props.conceptions.map(mapOption)
}
</script>

<style lang="less" >
.headingEstateForm {
    margin-bottom: 16px;
    font-size: 22px;
    font-weight: 600;
}

.boxInput {
    display: flex;
    flex-direction: column;
    margin-bottom: 17px;

    &:last-of-type {
        margin-bottom: 32px;
    }
}

.labelInput,
.labelSelect {
    margin-bottom: 7px;
    font-size: 16px;
}

.boxSelect .customSelect {
    min-height: 44px !important;
    // max-height: 40px !important;
    font-size: 16px;
}

.boxSelect .itemOption {
    padding: 9px 12px;
    font-size: 16px;
}

.estateSubmit {
    display: block;
    padding: 11px 38px;
    margin-top: 12px;
    font-size: 15px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    border-radius: 5px;
    background-color: rgba(247, 148, 60, 0.9);

    &:hover,
    &:focus {
        background-color: rgba(247, 148, 60, 0.6);
    }
}

.boxBtnEstate {
    display: flex;
    align-items: center;
}

.boxLoading {
    margin-left: 19px;
}


@media (min-width: 847px) {
    .headingEstateForm {
        margin-bottom: 27px;
        font-size: 25px;
    }

    .formEstate {
        max-width: 75%;
    }

    .labelInput,
    .labelSelect {
        margin-bottom: 9px;
        font-size: 17px;
    }

    .estateSubmit {
        padding: 13px 55px;
        font-size: 16px;
    }   
}

@media (min-width: 1200px) {
    .formEstate {
        max-width: 63%;
    }
}
</style>