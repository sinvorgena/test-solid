
import { asteroid1ImgPath, asteroid2ImgPath, asteroid3ImgPath, avatarImgPath, coinImgPath, homePageBgImgPath, LightningIcon, RobotIcon, TimerIcon } from '@/assets';
import { AnimImg } from '@/components/AnimImg';
import { AnimSvg } from '@/components/AnimSvg';
import { Button } from '@/components/Button';
import { formatCurrencyByDigits } from '@/lib/utils';
import { RootState, store } from '@/store';
import { setInProccess, setSeconds } from '@/store/game';
import classNames from 'classnames';
import { CSSProperties, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Home.module.scss';

export const EARNED_IMAGES: Record<string, {
  path: string
  styles: CSSProperties
}> = {
  'asteroid-1': {
    path: asteroid1ImgPath,
    styles: {
      background: 'rgba(34, 124, 231, 0.22)',
      backdropFilter: 'blur(8px)'
    }
  },
  'asteroid-2': {
    path: asteroid2ImgPath,
    styles: {
      background: 'linear-gradient(0deg, rgba(42, 227, 192, 0.10) 0%, rgba(42, 227, 192, 0.10) 100%), rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(8px)'
    }
  },
  'asteroid-3': {
    path: asteroid3ImgPath,
    styles: {
      background: 'rgba(244, 105, 255, 0.14)',
      backdropFilter: 'blur(8px)'
    }
  },
  'coin': {
    path: coinImgPath,
    styles: {
      background: 'rgba(255, 231, 105, 0.14)'
    }
  },
}

function Home() {
  const gameState = useSelector((state: RootState) => state.game)
  const userState = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
	const tickRef = useRef<number>(NaN)

	const oneGameTick = () => {
		const { seconds, isInProccess } = store.getState().game

		if (seconds === 0) {
      dispatch(setSeconds(3600))
      dispatch(setInProccess(false))
		}

		if (isInProccess) {
      dispatch(setSeconds(seconds - 1))
		}

		tickRef.current = setTimeout(oneGameTick, 1000)
	}

	useEffect(() => {
    dispatch(setInProccess(true))

		oneGameTick()

		return () => clearTimeout(tickRef.current)
	}, [])

  
  return (
    <div className={styles['home-page']}>
      <div className={styles['info']}>
        <div className={styles['info-top']}>
          <div className={classNames(styles['info-top__block'], styles['top-user'])}>
            <AnimImg src={avatarImgPath} className={styles['top-user__avatar']} />
            <div className={styles['top-user__name']}>{userState.name}</div>
          </div>
          <div className={classNames(styles['info-top__block'], styles['top-robot'])}>
            <div className={styles['top-robot__img']}>
              <AnimSvg width={20} height={20}>
                <RobotIcon/>
              </AnimSvg>
            </div>
            <div className={classNames(styles['top-robot__info'], styles['robot-info'])}>
              <div className={styles['robot-info__current']}>{gameState.activeRobots}/{gameState.maxRobots}</div>
              <div className={styles['robot-info__text']}>active robots</div>
            </div>
          </div>
        </div>  
        <div className={styles['info-cards']} style={{
          gridTemplateColumns: `repeat(${gameState.earned.length}, 1fr)`
        }}>
          {gameState.earned.map(item => (
            <div key={item.key} className={styles['earned-card']}>
              <AnimImg className={styles['earned-card__image']} src={EARNED_IMAGES[item.key].path} style={EARNED_IMAGES[item.key].styles}/>
              <div className={styles['earned-card__text']}>{formatCurrencyByDigits(item.value)}</div>
            </div>
          ))}
        </div>  
        <div className={styles['info-bottom']}>
          <div className={styles['data']}>
            <div className={styles['data__block']}>
              <div className={styles['data__icon']}>
                <AnimSvg width={20} height={20}>
				          <LightningIcon/>
			          </AnimSvg>
              </div>
              <div className={styles['data__info']}>
                <div className={styles['data__current']}>{formatCurrencyByDigits(gameState.energy)}/{formatCurrencyByDigits(gameState.maxEnergy)}</div>
                <div className={styles['data__text']}>amount of energy</div>
              </div>
            </div>

            <div className={styles['data__block']}>
              <div className={styles['data__icon']}>
                <AnimSvg width={20} height={20}>
				          <TimerIcon/>
			          </AnimSvg>
              </div>
              <div className={styles['data__info']}>
                <div className={styles['data__current']}>{new Date(gameState.seconds * 1000).toISOString().substr(11, 8)}</div>
                <div className={styles['data__text']}>time until energy ends</div>
              </div>
            </div>
          </div>

          <div className={styles['energy']} style={{'--progress': `${(gameState.energy / gameState.maxEnergy) * 100}%`} as CSSProperties}>
            <div className={styles['energy__line']}  />
            <div className={classNames(styles['energy__line'], styles['second'])} />
          </div>
        </div>  
      </div>
      <Button className={styles['main-cta-btn']}>
        Charge storage devices

        <AnimSvg width={20} height={20}>
          <LightningIcon/>
        </AnimSvg>
        </Button>
      <img className={styles['bg-image']} src={homePageBgImgPath} />
    </div>
  )
}

export default Home;
