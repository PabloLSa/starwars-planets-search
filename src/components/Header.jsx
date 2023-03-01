import React from 'react';
import styles from './styles/Header.module.css';
import NameFilter from './filters/NameFilter';
import NumberFilter from './filters/NumberFilter';

function Header() {
  return (
    <div className={ styles.body }>
      <NameFilter />
      <NumberFilter />
    </div>
  );
}

export default Header;
