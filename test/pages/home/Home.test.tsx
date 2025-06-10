// Home.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Home } from '../../../src/pages/home/Home';
import * as useHomeStateModule from '../../../src/pages/home/useHomeState';
import { sortByType } from '../../../src/pages/home/useHomeState';

jest.mock('../../../src/feature/content-list/ContentListContainer', () => () => (
  <div data-testid="ContentListContainer" />
));

const mockDispatch = jest.fn();
const mockSetKey = jest.fn();
const mockSetPaid = jest.fn();
const mockSetFree = jest.fn();
const mockSetViewOnly = jest.fn();
const mockHandleReset = jest.fn();
const mockHandlePriceRangeChange = jest.fn();
const mockHandleSortByChange = jest.fn();

const getDefaultMockState = (overrides = {}) => ({
  loading: false,
  error: '',
  sortedData: [],
  key: '',
  isPaid: false,
  isFree: false,
  isViewOnly: false,
  sortBy: "0"  as sortByType,
  minPrice: 0,
  maxPrice: 100,
  minPriceRange: 0,
  maxPriceRange: 100,
  setKey: mockSetKey,
  setPaid: mockSetPaid,
  setFree: mockSetFree,
  setViewOnly: mockSetViewOnly,
  handleReset: mockHandleReset,
  handlePriceRangeChange: mockHandlePriceRangeChange,
  handleSortByChange: mockHandleSortByChange,
  dispatch: mockDispatch,
  page: 1,
  fetchMore: jest.fn(),
  hasMore :false,
  isFetchingMore :false,
  ...overrides
});

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders KeySearch and ContentFilter', () => {
    jest.spyOn(useHomeStateModule, 'useHomeState').mockReturnValue(getDefaultMockState());

    render(<Home />);

    expect(screen.getByRole('textbox')).toBeInTheDocument(); // KeySearch input
    expect(screen.getByRole('combobox')).toBeInTheDocument(); // Sort dropdown
  });

  it('calls setKey on KeySearch input change', () => {
    jest.spyOn(useHomeStateModule, 'useHomeState').mockReturnValue(getDefaultMockState());

    render(<Home />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'abc' } });

    expect(mockSetKey).toHaveBeenCalledWith('abc');
  });

  it('shows loading spinner when loading is true', () => {
    jest.spyOn(useHomeStateModule, 'useHomeState').mockReturnValue(getDefaultMockState({ loading: true }));

    render(<Home />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument(); // CircularProgress
  });

  it('shows error UI when error is true and loading is false', () => {
    jest.spyOn(useHomeStateModule, 'useHomeState').mockReturnValue(getDefaultMockState({ error: true }));

    render(<Home />);
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/Retry/i)).toBeInTheDocument();
  });

  it('dispatches fetchContent on Retry click', () => {
    jest.spyOn(useHomeStateModule, 'useHomeState').mockReturnValue(getDefaultMockState({ error: true }));

    render(<Home />);
    fireEvent.click(screen.getByText(/Retry/i));
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('renders ContentListContainer when loading is false and no error', async () => {
    jest.spyOn(useHomeStateModule, 'useHomeState').mockReturnValue(getDefaultMockState());

    render(<Home />);
    await waitFor(() => {
      expect(screen.getByTestId('ContentListContainer')).toBeInTheDocument();
    });
  });

});

