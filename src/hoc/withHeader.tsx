import { ReactNode } from 'react';
import Header from '../components/Header';

export const withHeader = (component: ReactNode) => {
  return <>
    <Header />
    <div className="pt-14 h-full">
      {component}
    </div>
  </>;
};