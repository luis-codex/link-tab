import { Suspense } from 'react';
import { Toaster } from 'sonner';

export default function SonnerToaster() {
  return (
    <Suspense>
      <Toaster
        position='top-right'
        closeButton
        toastOptions={{
          className:
            'bg-background/20 backdrop-blur-3xl text-accent-6 border-accent-8/20',
          classNames: {
            closeButton:
              'bg-accent-5/40 backdrop-blur-3xl text-accent-7 hover:text-accent-2 border-accent-8/20',
          },
        }}
      />
    </Suspense>
  );
}
