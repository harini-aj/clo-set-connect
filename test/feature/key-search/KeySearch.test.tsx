import { render, screen } from '@testing-library/react';
import { KeySearch } from '../../../src/feature/key-search/KeySearch';


describe('KeySearch Component', () => {
  const setup = (searchText = '') => {
    const handleChange = jest.fn();
    render(<KeySearch searchText={searchText} onTextChange={handleChange} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    return { input, handleChange };
  };

  it('renders correctly with initial value', () => {
    const { input } = setup('initial');
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('initial');
  });

  it('renders search icon as end adornment', () => {
    setup();
    const icon = screen.getByTestId('SearchIcon');
    expect(icon).toBeInTheDocument();
  });
})