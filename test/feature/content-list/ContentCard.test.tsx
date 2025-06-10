import { render, screen } from '@testing-library/react';
import { ContentCard } from '../../../src/feature/content-list/ContentCard';
import type { Content } from '../../../src/types/content.types';

describe('ContentCard', () => {
  const baseContent: Content = {
    id: '123',
    title: 'Test Course',
    creator: 'John Doe',
    imagePath: 'https://example.com/image.jpg',
    price: 49.99,
    pricingOption: 0
  };

  it('should render nothing if no data is passed', () => {
    const { container } = render(<ContentCard />);
    expect(container.firstChild).toBeNull();
  });

  it('should render title & creator', () => {
    render(<ContentCard data={baseContent} />);
    
    expect(screen.getByText('Test Course')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should show price if pricingOption is 0 (paid)', () => {
    render(<ContentCard data={baseContent} />);
    expect(screen.getByText('$49.99')).toBeInTheDocument();
  });

  it('should show "Free" if pricingOption is 1', () => {
    const freeContent: Content = { ...baseContent, pricingOption: 1 };
    render(<ContentCard data={freeContent} />);
    expect(screen.getByText('Free')).toBeInTheDocument();
  });

  it('should show "View Only" if pricingOption is 2', () => {
    const viewOnlyContent: Content = { ...baseContent, pricingOption: 2 };
    render(<ContentCard data={viewOnlyContent} />);
    expect(screen.getByText('View Only')).toBeInTheDocument();
  });
});
