import classNames from 'classnames';
import { motion } from 'framer-motion';
import { FC, memo, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { AppModes } from '../store/app';
import styles from './Route.module.scss';

type RouteProps = {
  children: ReactNode;
};

const Route: FC<RouteProps> = ({ children }) => {
  const appMode = useSelector((state: RootState) => state.app.mode);
  const isAppLoading = appMode === AppModes.Loaging;

  return (
    <motion.div
      className={classNames(styles['route-container'], {
        [styles['visible']]: !isAppLoading
      })}
      animate={{ opacity: isAppLoading ? 0 : 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      initial={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default memo(Route);