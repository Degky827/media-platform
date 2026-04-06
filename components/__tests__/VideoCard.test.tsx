import { render, screen } from '@testing-library/react';
import VideoCard from '../VideoCard';
import type { VideoItem } from '@/lib/youtube';

const sample: VideoItem = {
  id: 'abc123',
  title: 'Sample Video',
  description: 'Test description',
  thumbnail: 'https://picsum.photos/200/120',
  publishedAt: new Date().toISOString(),
  viewCount: '1,234',
  duration: '3:21',
  channelTitle: 'ቻናል',
};

describe('VideoCard', () => {
  it('renders title and duration', () => {
    render(<VideoCard video={sample} />);
    expect(screen.getByText('Sample Video')).toBeInTheDocument();
    expect(screen.getByText('3:21')).toBeInTheDocument();
  });
});
