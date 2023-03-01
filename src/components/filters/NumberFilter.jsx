import React, { useContext, useState } from 'react';
import styles from './styles/Number.module.css';
import PlanetsContext from '../../context/PlanetsContext';

const opt = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];

function NumberFilter() {
  const { planets, setFilterPlanets, filterPlanets } = useContext(PlanetsContext);
  const [options, setOption] = useState(opt);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  // const [filterSave, setFilterSave] = useState([]);
  const [value, setValue] = useState('0');

  const handleFilter = () => {
    const filterComparision = filterPlanets.length > 0 ? filterPlanets : planets;
    let filter = [];
    if (comparison === 'maior que') {
      filter = filterComparision
        .filter((planet) => Number(planet[column]) > Number(value));
    }
    if (comparison === 'menor que') {
      filter = filterComparision
        .filter((planet) => Number(planet[column]) < Number(value));
    }
    if (comparison === 'igual a') {
      filter = filterComparision
        .filter((planet) => Number(planet[column]) === Number(value));
    }
    setFilterPlanets(filter);
  };

  const handleClick = () => {
    const noRepeatFilters = options.filter((option) => option !== column);
    setOption(noRepeatFilters);
    handleFilter();
    setColumn('population');
    setComparison('maior que');
    setValue('0');
    // setFilterSave([...filterSave, { column, comparison, value }]);
  };
  return (
    <div className={ styles.Number }>
      <label htmlFor="column">
        <select
          data-testid="column-filter"
          name="column"
          id="column"
          value={ column }
          onChange={ ({ target }) => setColumn(target.value) }
        >

          {options.map((option) => <option key={ option }>{option}</option>)}
        </select>
      </label>
      <label htmlFor="filterComparision">
        <select
          data-testid="comparison-filter"
          name="filterComparision"
          value={ comparison }
          onChange={ ({ target }) => setComparison(target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <label htmlFor="number">
          <input
            type="number"
            name="number"
            data-testid="value-filter"
            value={ value }
            onChange={ ({ target }) => setValue(target.value) }
          />
        </label>
        <label htmlFor="btt">
          <button
            type="button"
            data-testid="button-filter"
            onClick={ () => handleClick() }

          >
            Filtrar

          </button>
        </label>
      </label>
    </div>
  );
}

export default NumberFilter;
