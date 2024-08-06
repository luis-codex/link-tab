import { createHashRouter, RouterProvider } from 'react-router-dom';
import useLoadBookmarks from './hooks/useLoadBookmarks';
import useLoadTabs from './hooks/useLoadTabs';
import { routes } from './router';

const router = createHashRouter(routes);
export default function App() {
  useLoadBookmarks();
  useLoadTabs();
  return <RouterProvider router={router} />;
}
