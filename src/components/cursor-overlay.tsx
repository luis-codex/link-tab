import { IconFolderClosed, IconLink } from '@app/assets/icons';
import { DragItem, useDrag } from '@app/store/useDrag';
import { useMouse } from '@uidotdev/usehooks';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

/* TODO: mejorar el uso de los iconos */
const IconDragItem = (item: DragItem) => {
  switch (item.type) {
    case 'bookmark':
      return item.payload.type === 'link' ? (
        <IconLink className='size-4' />
      ) : (
        <IconFolderClosed className='size-4' />
      );
    case 'tab':
      return item.payload.type === 'tab' ? (
        <IconLink className='size-4' />
      ) : (
        <IconFolderClosed className='size-4' />
      );
  }
};

export default function CursorOverlay() {
  const [mouse, ref] = useMouse<HTMLDivElement>();
  const dragItem = useDrag((s) => s.dragItem);
  const setDragItem = useDrag((s) => s.setDragItem);

  useEffect(() => {
    if (dragItem) {
      const handleKeyUp = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setDragItem(null);
      };
      window.addEventListener('keyup', handleKeyUp);
      return () => {
        window.removeEventListener('keyup', handleKeyUp);
      };
    }
  }, [setDragItem, dragItem]);

  if (!dragItem) return;

  return createPortal(
    <motion.div
      ref={ref}
      className={`fixed z-[100] outline pointer-events-none p-1 text-accent-8 bg-accent-2 rounded-[calc(15px-10px)] opacity-90 scale-150`}
      style={{
        left: `${mouse.x}px`,
        top: `${mouse.y}px`,
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.1s ease',
      }}
    >
      <IconDragItem {...dragItem} />
    </motion.div>,
    document.body
  );
}
