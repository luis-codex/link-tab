import React, { useLayoutEffect, useState } from 'react';

export default function Modal({ root }: { root: HTMLElement }) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useLayoutEffect(() => {
    type parameters = Parameters<
      typeof chrome.runtime.onMessage.addListener
    >[0];

    const handler: parameters = (message, _, sendResponse) => {
      switch (message.type) {
        case 'TOGGLE_MODAL': {
          if (!document.querySelector('swift-manage-flow')) {
            document.documentElement.prepend(root);
          }

          setOpen((prev) => {
            const toggle = !prev;
            root.style.pointerEvents = toggle ? 'auto' : 'none';
            return toggle;
          });

          setTheme(message.payload);
          sendResponse('Active');
          return;
        }
        case 3:
          setTheme(message.payload);
          break;
        default:
          break;
      }
    };

    chrome.runtime.onMessage.addListener(handler);

    return () => {
      chrome.runtime.onMessage.removeListener(handler);
    };
  }, [root]);

  // useEffect(() => {
  //   const linkHidde = document.createElement('link');
  //   const atributes = {
  //     rel: 'stylesheet',
  //     type: 'text/css',
  //     href: chrome.runtime.getURL('hidde.css'),
  //     id: 'swift-manage-flow__Hide-scrollbars',
  //   };
  //   Object.assign(linkHidde, atributes);

  //   if (open) {
  //     document.head.appendChild(linkHidde);
  //   } else {
  //     linkHidde.remove();
  //   }

  //   return () => {
  //     linkHidde.remove();
  //   };
  // }, [open]);

  return (
    <>
      <link rel='stylesheet' href={chrome.runtime.getURL('injectModal.css')} />
      <div
        data-open={open}
        className={`modal ${theme}`}
        style={
          {
            '--bg': `url(${chrome.runtime.getURL('d3.jpg')})`,
          } as React.CSSProperties
        }
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setOpen(false);
          }
        }}
      >
        <div
          className='backdrop'
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        />
        <iframe
          src={
            chrome.runtime.getURL('index.html')
            // 'http://localhost:5173/'
          }
        ></iframe>
      </div>
    </>
  );
}
