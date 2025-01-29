import classNames from 'classnames';
import { motion, Variants } from 'framer-motion';
import { CSSProperties, FC } from 'react';
import { useSelector } from 'react-redux';
import { appLoaderBgImgPath } from '../assets';
import { AnimImg } from '../components/AnimImg';
import { RootState } from '../store';
import { AppModes } from '../store/app';
import styles from './AppLoading.module.scss';

const VARIANTS: Variants = {
  show: {
    opacity: 1,
    transition: { duration: 0.1 },
  },
  hide: {
    opacity: 0,
    transition: { duration: 0.1 },
  },
};

export const AppLoading: FC = () => {
  const appMode = useSelector((state: RootState) => state.app.mode);
  const appLoadingProgress = useSelector((state: RootState) => state.app.loadingProgress);
  const isLoading = appMode === AppModes.Loaging;

  return (
    <motion.div
      className={styles['app-loading']}
      animate={isLoading ? 'show' : 'hide'}
      initial={{ opacity: 0 }}
      variants={VARIANTS}
    >
      <div className={styles['content']}>
      <div className={styles['title']}>Wars Stars: Expedition</div>
      {/* <div className={styles['bottom']}> */}
      <div className={styles['loading-title']}>Loading</div>
      <div className={styles['loading-bar']}>
        <div className={styles['line']} style={{'--progress': `${appLoadingProgress}%`} as CSSProperties} />
        <div className={classNames(styles['line'], styles['second'])} style={{'--progress': `${appLoadingProgress}%`} as CSSProperties} />
      </div>
      <div className={styles['description']}>
        In the "friends" tab you can see statistics
        on the number of referrals of 3 lines
        and additional earnings from them
      </div>
      {/* </div> */}
      </div>
      <AnimImg
        skipLoading
        className={styles['background-image']}
        src={appLoaderBgImgPath}
      />
    </motion.div>
  );
};