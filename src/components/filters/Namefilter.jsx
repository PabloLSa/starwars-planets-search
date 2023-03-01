import React, { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../../context/PlanetsContext';

function Namefilter() {
  const { planets, setFilterPlanets } = useContext(PlanetsContext);
  // estado para nome dos planetas
  const [nameInput, setNameInput] = useState('');

  // useEffect para filtrar os planetas
  useEffect(() => {
    const filter = planets.filter((planet) => planet.name.includes(nameInput));
    setFilterPlanets(filter);
  }, [nameInput, setFilterPlanets, planets]);

  const handleChange = (event) => {
    setNameInput(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        value={ nameInput }
        onChange={ handleChange }
      />
    </div>
  );
}

export default Namefilter;
