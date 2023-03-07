import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import React from 'react';

describe('Hello', () => {
  it('I am your test',async  () => {
    render(<App />);
  
   await waitFor(()=> {
    const firstPlanet = screen.getByText('Tatooine')
    expect(firstPlanet).toBeInTheDocument()
   }, {timeout: 4000})
  
  
   userEvent.click(screen.getByTestId('button-filter'))
  
    const inputColuna = screen.getByTestId('column-filter')
    const inputComparacao = screen.getByTestId('comparison-filter')
    const inputValor = screen.getByTestId('value-filter')
  
    userEvent.selectOptions(inputColuna, 'surface_water')
    userEvent.selectOptions(inputComparacao, 'menor que')
    userEvent.type (inputValor, '20')
  
    userEvent.click(screen.getByTestId('button-filter'))
  
    userEvent.selectOptions(inputColuna, 'diameter')
    userEvent.selectOptions(inputComparacao, 'maior que')
    userEvent.type (inputValor, '19000')
  
    userEvent.click(screen.getByTestId('button-filter'))
  
    const botoes = screen.getAllByRole('button')
    userEvent.click(botoes[2])
  
    userEvent.type(screen.getByTestId('name-filter'), 'a')
  
    userEvent.click(botoes[1])
  
  
  });
  
})