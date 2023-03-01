import React from 'react';
import styles from './App.module.css';
import Header from './components/Header';
import Table from './components/Table';
import ProviderPlanets from './context/ProviderPlanets';

function App() {
  return (
    <div className={ styles.body }>
      <span>
        <h1 className={ styles.title }>Star Wars</h1>
      </span>
      <ProviderPlanets>
        <Header />
        <Table />
      </ProviderPlanets>
    </div>

  );
}

export default App;
