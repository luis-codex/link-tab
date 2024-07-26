import { useLayoutEffectOnce } from '@app/hooks/useEffectOnce';
import { useThemeStore } from '@app/store/store-theme';
import {
  IPortMessage,
  PopupMessageEvent,
  useGlobalPort,
} from '@app/store/usePort';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useLayoutEffect } from 'react';

export default function BtnToggleTheme() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const port = useGlobalPort((s) => s.port);

  const handleToggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    port.postMessage({ type: IPortMessage.REVALIDATE_THEME });
    toggleTheme();

    if (__ISPROD_) {
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
          chrome.tabs
            .sendMessage(tab.id!, {
              type: IPortMessage.REVALIDATE_THEME,
              payload: theme === 'dark' ? 'light' : 'dark',
            })
            .catch(() => {});
        });
      });
    }
  };

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useLayoutEffectOnce(() => {
    useThemeStore.persist.rehydrate();
  });

  useEffect(() => {
    const handler = (event: PopupMessageEvent) => {
      const { type } = event.data;
      if (type === IPortMessage.REVALIDATE_THEME) {
        useThemeStore.persist.rehydrate();
      }
    };

    port.addEventListener('message', handler);
    return () => {
      port.removeEventListener('message', handler);
    };
  }, [port]);

  return (
    <button className='u-flex-center-start outline-none text-accent-5 hover:text-accent-7'>
      {theme === 'dark' ? (
        <Sun onClick={handleToggleTheme} className='size-4' />
      ) : (
        <Moon onClick={handleToggleTheme} className='size-4' />
      )}
    </button>
  );
}
