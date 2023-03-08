import { render, screen } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('Health Bars render for each monster', () => { 

  it('Three monster hp bars exists', () => {

    render(<App/>)
    const labels = screen.getAllByLabelText("HP:")
    // console.log(labels)
    expect(labels.length).toEqual(3)
  })

  it('Three monster starting health amounts are correct', () => {

    let actual = []
    render(<App/>)
      screen.getAllByLabelText("HP:").forEach(e => {
      actual.push(e.valueAsNumber)
    });

    let expected = [10, 15, 20]

    expect(actual[0]).toEqual(expected[0])
    expect(actual[1]).toEqual(expected[1])
    expect(actual[2]).toEqual(expected[2])

  })

 })
