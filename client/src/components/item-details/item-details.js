import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { format } from "date-fns";

import Map from '../map';
import RatingItem from '../rating-item';
import {BelgoServiceConsumer} from '../belgo-service-context';
import Spinner from '../spinner';
import Modal from '../modal';
import BookingCalendar from '../booking-calendar';

import  {openModal}  from '../../utils';
import styles from './item-details.m.less';

const ItemDetails = (props) => {
	const {imageDetails, imageIntro, price, rating, concept, descriptionShort,
			information, conception, address, handlePayment, slug, isLoadPay,
			cancelPay, isConfirmPay, urlConfirm, bookings } = props;
	const paymentDesc = `Payment for ${conception?.label} - ${slug}`;
	const [filterLoadPay, setFilterLoadPay] = useState(isLoadPay);
	const [filterConfirmPay, setFilterConfirmPay] = useState(isConfirmPay);
	const [urlPay, setUrlPay] = useState(urlConfirm); 
	const [open, setOpen] = useState(false);
	const [range, setRange] = useState([
		{
			startDate: new Date(),
			endDate: null,
			key: 'selection',
		}
	]);

	const startOfDay = (date) => {
		if (!date) return null;
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);

        return d;
    };

	const defRange = (newRange) => {
		const selection = newRange.selection || range[0];
		
		setRange([
			{
				startDate: startOfDay(selection.startDate),
				endDate: selection.endDate ? startOfDay(selection.endDate) : null,
				key: 'selection'
			}
		]);
	}

	const formattedRange = {
		startDate: format(range[0].startDate, "yyyy-MM-dd"),
		endDate: range[0].endDate != null ? format(range[0].endDate, "yyyy-MM-dd") : null,
	};

	useEffect(() => {
		setFilterLoadPay(isLoadPay);
		setFilterConfirmPay(isConfirmPay);
		setUrlPay(urlConfirm);
	}, [isLoadPay, isConfirmPay, urlConfirm]);

	return (
		<BelgoServiceConsumer.Consumer>
			{ (belgoService) => (
				<div className={styles.mainContainer}>
					<div className={styles.firstContainter}>
						<a href="#" className={styles.linkImage}>
							<picture className={styles.pictureDetails}>
								<source media="(min-width: 1280px)" srcSet={`${belgoService._apiImages}${imageDetails}`} />
								<img 	src={`${belgoService._apiImages}${imageIntro}`} alt="offer photo" 
										className={styles.offerImage} />
							</picture>
						</a>
							<p className={styles.labelMap}>Location</p>
							<Map stylesMapContainer={styles.mapContainer} address_detail={props} />
					</div>

					<div className={styles.secondContainer}>
						<div className={styles.motileBox}>
							<div className={styles.boxDescription}>
								<p className={styles.descriptionShort}>{descriptionShort}</p>
								<p>{conception?.label}</p>
								<div className={styles.information}>{information}</div>
								<RatingItem rating={rating} />
								<p className={styles.price}>
									<span>Price per night</span>
									<b>
										{Math.round(price)}
										<b className={styles.euro}>&#8364;</b>
									</b>
								</p>
							</div>
							{/* <Link to=""
									className={styles.linkOrder}
									onClick={() => openModal('[class^="modalBox"]')} >
								make an order !
							</Link> */}
							<div className={styles.boxPay}>
								{
									filterLoadPay ? (
										<div className={styles.boxSpinner}>
											<Spinner />
										</div>
									) : null
								}
								{
									!filterConfirmPay ? (
										<div className={styles.innerBoxPay}>
											<button 
												className={styles.btnDating}
												onClick={() => setOpen(!open)}
												>
												Dating
											</button>

											<button className={styles.btnPay}
													onClick={()=>handlePayment(price, paymentDesc, formattedRange)}
											>
												Pay
											</button>
										</div>
									) : null
								}
							    {
									filterConfirmPay ? (
										<div className={styles.boxConfirmPay}>
											<Link   to={urlPay}
													className={styles.linkConfirmPay}
													>
												Confirm
											</Link>
											<button className={styles.btnCanceledPay}
													onClick={cancelPay}
													>
												Cancel
											</button>
										</div>
									) : null
								}
							</div>
						</div>
					</div>

					<Map stylesMapContainer={styles.mapContainer_2} address_detail={props} />
					{
						open && (
							<Modal
								onSwitch={() => setOpen(false)}
								classDialog={true}
							>
								<BookingCalendar
									range={range}
									setRange={defRange}
									bookings={bookings}
									startOfDay={startOfDay}
									onClose={() => setOpen(false)}
								/>
							</Modal>
						)
					}
				</div>
			)}
		</BelgoServiceConsumer.Consumer>
	);
};

export default ItemDetails;