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
import CursorOverlay from './components/cursor-overlay.tsx';
import './globals.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppCopy />

    <div className='fixed inset-0  -z-10 u-size-screen bg-white dark:bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]'>
      <div className='fixed left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400/30 dark:bg-accent-8/30 opacity-20 blur-[100px] dark:blur-[200px]'></div>
    </div>
    <CursorOverlay />
  </StrictMode>
);
