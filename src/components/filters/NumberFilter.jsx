import React, { useContext, useState } from 'react';
import styles from './styles/Number.module.css';
import PlanetsContext from '../../context/PlanetsContext';

const opt = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];

function NumberFilter() {
  const { planets,
    setFilterPlanets,
    filterPlanets,
    save,
    setSave } = useContext(PlanetsContext);
  const [options, setOption] = useState(opt);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  // const [filterSave, setFilterSave] = useState([]);
  const [value, setValue] = useState('0');

  const handleFilter = (col, com, val, fc) => {
    const filterComparision = fc;
    let filter = [];
    if (com === 'maior que') {
      filter = filterComparision
        .filter((planet) => Number(planet[col]) > Number(val));
    }
    if (com === 'menor que') {
      filter = filterComparision
        .filter((planet) => Number(planet[col]) < Number(val));
    }
    if (com === 'igual a') {
      filter = filterComparision
        .filter((planet) => Number(planet[col]) === Number(val));
    }
    return filter;
  };

  const handleRemoveNumericFilter = (columnName) => {
    const newSave = save.filter((f) => f.column !== columnName);
    setSave(newSave);
    setOption([...options, columnName]);
    let newArray = planets;
    newSave.forEach((element) => {
      newArray = handleFilter(
        element.column,
        element.comparison,
        element.value,
        newArray,
      );
    });
    setFilterPlanets(newArray);
  };

  // const handleRemoveFilter = () => {
  // setFilterPlanets(planets);
  // setOption(opt);
  // };

  const handleRemoveAllFilters = () => {
    setSave([]);
    setFilterPlanets(planets);
  };

  const handleClick = () => {
    const noRepeatFilters = options.filter((option) => option !== column);
    setOption(noRepeatFilters);
    setSave([
      ...save, { column, comparison, value },
    ]);
    setFilterPlanets(handleFilter(column, comparison, value, filterPlanets));
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
        {save.map((filter) => (
          <div data-testid="filter" key={ filter.column }>
            <span>
              {filter.column}
              {' '}
              {filter.comparison}
              {' '}
              {filter.value}
            </span>
            <button
              type="button"
              onClick={ () => handleRemoveNumericFilter(filter.column) }
            >
              X

            </button>
          </div>
        ))}

        <label htmlFor="removeFIlter">
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ () => handleRemoveAllFilters() }
          >
            Remover filtros
          </button>

        </label>
      </label>
    </div>
  );
}

export default NumberFilter;
