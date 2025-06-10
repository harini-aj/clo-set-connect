import { render, screen } from '@testing-library/react';
import ContentListContainer from '../../../src/feature/content-list/ContentListContainer';
import type { Content } from '../../../src/types/content.types';

jest.mock('../../../src/feature/content-list/ContentCard', () => ({
  ContentCard: ({ data }: { data: Content }) => (
    <div data-testid="mock-content-card">{data.title}</div>
  ),
}));

describe('ContentListContainer', () => {
  const mockData: Content[] = [
    {
      id: '1',
      title: 'Course 1',
      creator: 'Jane Doe',
      imagePath: 'img1.jpg',
      price: 0,
      pricingOption: 1,
    },
    {
      id: '2',
      title: 'Course 2',
      creator: 'John Smith',
      imagePath: 'img2.jpg',
      price: 10,
      pricingOption: 0,
    },
  ];

  it('should render no results if data is undefined', () => {
    const { container } = render(<ContentListContainer />);
    expect(container).toBeInTheDocument();
    expect(screen.queryByText(/results/)).not.toBeInTheDocument();
    expect(screen.queryAllByTestId('mock-content-card')).toHaveLength(0);
  });

  it('should render no results if data is empty array', () => {
    const { container } = render(<ContentListContainer data={[]} />);
    expect(container).toBeInTheDocument();
    expect(screen.queryByText(/results/)).not.toBeInTheDocument();
    expect(screen.queryAllByTestId('mock-content-card')).toHaveLength(0);
  });

  it('should render result count if data has items', () => {
    render(<ContentListContainer data={mockData} />);
    expect(screen.getByText('2 results')).toBeInTheDocument();
  });

  it('should render ContentCard for each item', () => {
    render(<ContentListContainer data={mockData} />);
    const cards = screen.getAllByTestId('mock-content-card');
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent('Course 1');
    expect(cards[1]).toHaveTextContent('Course 2');
  });
});
