/* eslint-disable react-hooks/exhaustive-deps */
import { lazy, Suspense } from 'react';
import List from './components/List';
import Header from './components/header';
import Paguination from './components/paguination';

const BtnDeleteLazy = lazy(() => import('../(index)/BtnDelete'));

export default function Page() {
  return (
    <div className='size-full flex flex-col'>
      <Header />
      <List />
      <Paguination />
      <Suspense>
        <BtnDeleteLazy />
      </Suspense>
    </div>
  );
}
