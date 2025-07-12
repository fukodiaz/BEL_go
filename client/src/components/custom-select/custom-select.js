import React, { useState } from "react";
import { Link } from 'react-router-dom';
import styles from './custom-select.m.less';

const CustomSelect = ({ options, onChange = () =>{} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  const handleSelect = (option) => {
    setSelected(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.customSelect}>
      <div
        className={styles.customSelectTrigger}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.label}

        <span className={styles.customSelectArrow} />
      </div>

      {isOpen && (
        <ul 
          className={styles.customSelectOptions}>
          {options.map((option) => (
            <li
              key={option.value}
              className={styles.customSelectOption}
            >
                <Link 
                    to={`/real_estate/category/${option.label}/`}
                    className={styles.customSelectLink}
                    onClick={() => handleSelect(option)}
                >
                     {option.label}
                </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;