// jest.setup.ts
import '@testing-library/jest-dom';

import { TextEncoder, TextDecoder } from 'util';

// Polyfill for TextEncoder/TextDecoder in Node.js
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
