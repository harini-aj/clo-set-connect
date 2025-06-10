import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContentFilter, { ContentFilterProps } from '../../../src/feature/content-filter/ContentFilter';

describe("ContentFilter", () => {
  const mockProps: ContentFilterProps = {
    isPaid: true,
    isFree: false,
    isViewOnly: true,
    priceRange: [10, 50],
    minRange: 0,
    maxRange: 100,
    onPaidChange: jest.fn(),
    onFreeChange: jest.fn(),
    onViewOnlyChange: jest.fn(),
    onPriceRangeChange: jest.fn(),
    onReset: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders checkboxes with correct states", () => {
    render(<ContentFilter {...mockProps} />);
    expect(screen.getByLabelText("Paid")).toBeChecked();
    expect(screen.getByLabelText("Free")).not.toBeChecked();
    expect(screen.getByLabelText("View Only")).toBeChecked();
  });

  it("triggers handlers on checkbox clicks", () => {
    render(<ContentFilter {...mockProps} />);
    fireEvent.click(screen.getByLabelText("Paid"));
    fireEvent.click(screen.getByLabelText("Free"));
    fireEvent.click(screen.getByLabelText("View Only"));

    expect(mockProps.onPaidChange).toHaveBeenCalled();
    expect(mockProps.onFreeChange).toHaveBeenCalled();
    expect(mockProps.onViewOnlyChange).toHaveBeenCalled();
  });

  it("renders slider and reset button", () => {
    render(<ContentFilter {...mockProps} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders).toHaveLength(2);
    expect(screen.getByText("RESET")).toBeInTheDocument();
  });

  it("calls onReset when reset button is clicked", () => {
    render(<ContentFilter {...mockProps} />);
    fireEvent.click(screen.getByText("RESET"));
    expect(mockProps.onReset).toHaveBeenCalled();
  });

  it("calls onPriceRangeChange when slider value changes", () => {
    render(<ContentFilter {...mockProps} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders).toHaveLength(2);

    fireEvent.change(sliders[0], { target: { value: 40 } });
    expect(mockProps.onPriceRangeChange).toHaveBeenCalled();
  });

  it("renders the pricing options label", () => {
    render(<ContentFilter {...mockProps} />);
    expect(screen.getByText("Pricing Options")).toBeInTheDocument();
  });
});


