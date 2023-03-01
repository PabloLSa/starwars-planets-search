import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const API_URL = 'https://swapi.dev/api/planets';

function ProviderPlanets({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterPlanets, setFilterPlanets] = useState([]);
  useEffect(() => {
    async function fetchPlanets() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const cleanedData = data.results.map(({ residents, ...rest }) => rest);
        setPlanets(cleanedData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPlanets();
  }, []);
  const context = {
    planets, filterPlanets, setFilterPlanets,
  };
  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}
ProviderPlanets.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderPlanets;
