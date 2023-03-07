import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('Test',() => {
  it('I am your test',async  () => {
    render(<App />);
  
   await waitFor(()=> {
    const FirstPlanet = screen.getByText('Tatooine')
    expect(FirstPlanet).toBeInTheDocument()
   }, {timeout: 4000})
  
    const InputColuna = screen.getByTestId('column-filter')
    const InputComparacao = screen.getByTestId('comparison-filter')
    const numberInput = screen.getByTestId('value-filter')
  
    userEvent.selectOptions(InputColuna, 'surface_water')
    userEvent.selectOptions(InputComparacao, 'igual a')
    userEvent.type(numberInput, '30')
    userEvent.click(screen.getByTestId('button-filter'))
    userEvent.selectOptions(InputColuna, 'diameter')
    userEvent.selectOptions(InputComparacao, 'igual a')
    userEvent.type(numberInput, 'Pablo123')
    userEvent.click(screen.getByTestId('button-filter'))
  
  });
})