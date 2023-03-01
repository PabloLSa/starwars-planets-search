import React from 'react';
import './App.css';
import Header from './components/Header';
import Table from './components/Table';
import ProviderPlanets from './context/ProviderPlanets';

function App() {
  return (

    <ProviderPlanets>
      <Header />
      <Table />
    </ProviderPlanets>

  );
}

export default App;
