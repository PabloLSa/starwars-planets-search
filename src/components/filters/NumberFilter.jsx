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
  // const [sort, setSort] = useState({ column: 'population', ordenar: 'ASC' });
  const [columnSort, setColumnSort] = useState('population');
  const [columnOrder, setColumnOrder] = useState('ASC');

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
  // const handleSort = () => {
  //   const sortedPlanets = planets.sort((a, b) => {
  //     let columnA = a[sort.column];
  //     let columnB = b[sort.column];

  //     if (columnA === 'unknown') {
  //       columnA = Infinity;
  //     } else {
  //       columnA = Number(columnA);
  //     }

  //     if (columnB === 'unknown') {
  //       columnB = Infinity;
  //     } else {
  //       columnB = Number(columnB);
  //     }

  //     if (sort.ordenar === 'ASC') {
  //       return columnA - columnB;
  //     }
  //     return columnB - columnA;
  //   });

  //   setFilterPlanets(sortedPlanets);
  //   // setSort({ ...sort });
  // };

  // const handleRemoveFilter = () => {
  // setFilterPlanets(planets);
  // setOption(opt);
  // };

  const handleSort = () => {
    const planetFilter = filterPlanets.sort((a, b) => {
      const lessOne = -1;
      if (b[columnSort] === 'unknown') return lessOne;

      if (columnOrder === 'ASC') {
        return +a[columnSort] - +b[columnSort];
      }

      return +b[columnSort] - +a[columnSort];
    });
    const newArrays = [...planetFilter];
    setFilterPlanets(newArrays);
    // console.log(planetFilter);
  };

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
      <label
        htmlFor="sortSelect"
      >
        <select
          name="Ordem"
          data-testid="column-sort"
          id="sortSelect"
          value={ columnSort }
          onChange={ (e) => setColumnSort(e.target.value) }
        >
          {options.map((option) => <option key={ option }>{option}</option>)}
        </select>
      </label>
      <label htmlFor="ASC">
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          name="Order"
          id="ASC"
          value="ASC"
          onChange={ (e) => setColumnOrder(e.target.value) }
        />
      </label>
      <label htmlFor="DESC">
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          name="Order"
          id="DESC"
          value="DESC"
          onChange={ (e) => setColumnOrder(e.target.value) }
        />
      </label>
      <button
        data-testid="column-sort-button"
        onClick={ handleSort }
      >
        ordenar
      </button>
    </div>
  );
}

export default NumberFilter;
