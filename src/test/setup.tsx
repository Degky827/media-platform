import React from 'react';
import '@testing-library/jest-dom';

// Mock next/image to a simple img to avoid Next's runtime behavior in tests
import { vi } from 'vitest';
vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // return an img with an explicit empty alt to satisfy a11y rules in tests
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <img alt="" {...(props as any)} />;
  },
}));
