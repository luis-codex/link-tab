import '@fontsource/geist-mono/500.css';
import '@fontsource/geist-sans/100.css';
import '@fontsource/geist-sans/200.css';
import '@fontsource/geist-sans/300.css';
import '@fontsource/geist-sans/400.css';
import '@fontsource/geist-sans/500.css';
import '@fontsource/geist-sans/600.css';
import '@fontsource/geist-sans/700.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppCopy from './App copy.tsx';
import './globals.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppCopy />
  </StrictMode>
);
