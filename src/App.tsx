import { Outlet } from '@tanstack/react-router';
import { FC, useEffect } from 'react';

import { createDoubleTapPreventer } from './lib/utils';

import styles from './App.module.scss';
import { AppLoading } from './widgets/AppLoading';
import { FooterMenu } from './widgets/FooterMenu';

const App: FC = () => {
  useEffect(() => {
    const touchStartPrevent = createDoubleTapPreventer(500);
    document.body.addEventListener('touchstart', touchStartPrevent, { passive: false });

    return () => {
      document.body.removeEventListener('touchstart', touchStartPrevent);
    };
  }, []);

  return (
    <>
      <AppLoading />

      <div className={styles['app-container']}>
        <div className={styles['content']}>
          <Outlet />
        </div>

        <FooterMenu />
      </div>
    </>
  );
};

export default App;