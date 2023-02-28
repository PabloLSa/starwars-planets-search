import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ProviderPlanets from './context/ProviderPlanets';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <ProviderPlanets>
      <App />
    </ProviderPlanets>,

  );
