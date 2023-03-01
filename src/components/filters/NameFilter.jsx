import React, { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../../context/PlanetsContext';
import styles from './styles/NameFilter.module.css';

function Namefilter() {
  const { planets, setFilterPlanets } = useContext(PlanetsContext);
  // estado para nome dos planetas
  const [nameInput, setNameInput] = useState('');

  // useEffect para filtrar o nome dos planetas
  useEffect(() => {
    const filter = planets.filter((planet) => planet.name.includes(nameInput));
    setFilterPlanets(filter);
  }, [nameInput, setFilterPlanets, planets]);

  const handleChange = (event) => {
    setNameInput(event.target.value);
  };

  return (
    <div className={ styles.Name }>
      <label htmlFor="pesquisa">
        <input
          type="text"
          id="pesquisa"
          data-testid="name-filter"
          value={ nameInput }
          onChange={ handleChange }
        />
      </label>

    </div>
  );
}

export default Namefilter;
