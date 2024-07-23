import React from 'react';
import { createRoot } from 'react-dom/client';
import Modal from './Modal.tsx';

/* clean init */
document.querySelectorAll('swift-manage-flow').forEach((el) => el.remove());
// document
//   .querySelectorAll('link#swift-manage-flow__Hide-scrollbars')
//   .forEach((el) => el.remove());
/* clean end */

const root = document.createElement('swift-manage-flow');
root.style.position = 'fixed';
root.style.top = '0';
root.style.left = '0';
root.style.zIndex = '99999999999999999999';
root.style.userSelect = 'none';
const shadow = root.attachShadow({ mode: 'closed' });
createRoot(shadow).render(<Modal root={root} />);
document.documentElement.append(root);
