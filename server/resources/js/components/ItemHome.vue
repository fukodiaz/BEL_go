<template>
    <div className='boxOffer'>
        <div className='linkOffer'>
            
                <!-- imageIntro  -->
                    <img 
                            :src="`/images/${imageIntro}`"
                            alt="photo of the proposed building"
                    />
                    
                        <!-- <img src={home} 
                                alt="crushed image"
                                className={styles.imgError} /> -->
                    
        </div>
        <div className='infoOffer'>
            <p className='priceOffer'>
                <b>&#8364;{{price}}</b>
                <span>/</span>night
            </p>
            <!-- {/* <RatingItem rating={rating} /> */} -->
            <!-- <CustomRating
                    initialRating={rating}
                    id={id}
                    authData={authData}
                    navigate={navigate}
                    location={location}
                    readonly /> -->

            <p className='descrOffer'>
                {{descriptionShort}}
            </p>
            <p className='conceptOffer'>
                {{conception?.label}}
            </p>
			<p className='conceptOffer'>
                {{slug}}
            </p>

			<ul class="boxPanelHome">
				<li class="boxEditHome">
					<button class="btnEditHome">
						<svg width="28" height="28">
                    		<use href="#pencil"></use>
                		</svg>
					</button>
				</li>
				<li class="boxDeleteHome">
					<button class="btnDeleteHome">
						<svg width="28" height="28">
                    		<use href="#trash"></use>
                		</svg>
					</button>
				</li>
			</ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        imageIntro: {type: String},
        price: {type: String},
        conception: {type: Object},
        // concept_label: {type: String},
        descriptionShort: {type: String},
		slug: {type: String},
    }
}
</script>

<style lang="less" scoped>
.linkOffer {
	// display: block;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	min-width: 300px;
	min-height: 230px;
	background-color: rgba(190, 190, 190, 0.3);
	border-radius: 7px 7px 0px 0px;
}

.linkOffer img {
	border-radius: 7px 7px 0px 0px;
}

.imageOffer {
	display: block;
	border-radius: 4px;
}

.imgErr {
	max-width: 73px;
	max-height: 73px;
}

.priceOffer {
	display: inline-block;
	padding: 3px 7px;
	margin-bottom: 10px;
	border-radius: 5px;
	outline: 1px solid rgba(78, 59, 49, 0.5);

	& b {
		padding-right: 1px;
	}
	& span {
		padding-right: 1px;
	}
}

.infoOffer {
	position: relative;
	padding-left: 13px;
	padding-top: 15px;
}

.buttonLike {
	position: absolute;
	top: 14px;
	right: 15px;
	background-color: transparent;
	& .svgBox {
		color: rgba(190,190,190, 0.3);

		&:hover {
			color: rgba(205, 118, 118, 0.4) !important;
			// color: #d17a23e6;
		}
	}
}

.descrOffer {
	margin-bottom: 5px;
	font-size: 17px;
}

.conceptOffer {
	margin-bottom: 5px;
	font-size: 17px;
	font-weight: 700;
}

.boxPanelHome {
	display: flex;
	position: absolute;
	top:11px;
	right: 0;
}

.boxEditHome {
	margin-right: 4px;
}

.boxPanelHome button {
	color: rgba(0, 0, 0, .8);

	&:hover {
		color: rgba(0, 0, 0, .5);
	}
}

@media (min-width: 847px) {

	.infoOffer {
		padding-left: 10px;
	}
}

@media (min-width: 1280px) {

	.infoOffer {
		padding-left: 13px;
	}
}
</style>