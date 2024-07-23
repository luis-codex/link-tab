/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGlobalStore } from '@app/store/store-global';
import { useMouse } from '@uidotdev/usehooks';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function CursorOverlay() {
  const [mouse, ref] = useMouse();
  const dragItem = useGlobalStore((s) => s.dragItem);
  const SetDragItem = useGlobalStore((s) => s.SetDragItem);

  useEffect(() => {
    if (dragItem) {
      const handleKeyUp = (e: KeyboardEvent) => {
        if (e.key === 'Escape') SetDragItem(null);
      };

      window.addEventListener('keyup', handleKeyUp);
      return () => {
        window.removeEventListener('keyup', handleKeyUp);
      };
    }
  }, [SetDragItem, dragItem]);

  if (!dragItem) return;

  return createPortal(
    <div
      ref={ref as any}
      className='fixed z-50 rounded-md pointer-events-none bg-accent-3 size-5 animate-fade-in-blur'
      style={{
        left: `${mouse.x}px`,
        top: `${mouse.y}px`,
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.1s ease',
      }}
    ></div>,
    document.body
  );
}
