import React, {useState, useEffect} from 'react';
import {DateRange} from 'react-date-range'
import { addDays } from 'date-fns';
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import styles from './booking-calendar.m.less';

const BookingCalendar = (props) => {
    const {range, setRange, onClose, bookings, startOfDay=()=>{}} = props;
   // console.log('bookings: ', bookings);

    const disabledRanges = bookings.map(b => ({
        start: startOfDay(b.check_in),
        end: startOfDay(b.check_out)
    }));

    const isDateDisabled = (date) => {
        return disabledRanges.some(range =>
            date >= range.start && date <= range.end
        );
    };

    useEffect(() => {
        console.log('range: ', range)
    }, [range])

    return (
        <div className={styles.boxCalendar}>
            <DateRange
                ranges={range}
                //onChange={(item) => setRange([item.selection])}
                onChange={(item) => setRange(item)}
                disabledDay={isDateDisabled}
                moveRangeOnFirstSelection={false}
                editableDateInputs={true}
                 
                months={1}
                direction="horizontal"
                className={`${styles.boxDataRange} ${range[0].endDate == null ? styles.secBoxRange : ''}`}
            >
               
            </DateRange>

            <div className={styles.boxBtnCal}>
                <button
                    className={styles.btnCalendar}
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default BookingCalendar;