import { Link, useLocation } from '@tanstack/react-router'
import { ComponentProps, ReactNode } from 'react'

import { footerBgImgPath, unionImgPath } from '@/assets'
import AnimatedByPageLoading from '@/components/AnimatedByPageLoading'
import { AnimImg } from '@/components/AnimImg'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { DocumentIcon, FriendsIcon, LightningIcon, PlanetIcon } from '../assets/vector'
import { AnimSvg } from '../components/AnimSvg'
import { NavLink } from '../components/NavLink'
import { RootState } from '../store'
import { AppModes } from '../store/app'
import styles from './FooterMenu.module.scss'

const FOOTER_LINKS: {
	image?: ReactNode
	name: string
	url: NonNullable<ComponentProps<typeof Link>['to']>
	disable?: boolean
	isCircle?: boolean
}[] = [
	{
		name: 'Radar',
		image: (
			<PlanetIcon/>
		),
		url: '/radar'
	},
	{
		name: 'Market',
		image: (
			<LightningIcon/>
		),
		url: '/market'
	},
	{
		name: 'Starship',
		isCircle: true,
		url: '/'
	},
	{
		name: 'Tasks',
		image: (
			<FriendsIcon/>
		),
		url: '/tasks'
	},
	{
		name: 'Friends',
		image: (
			<DocumentIcon/>
		),
		url: '/friends'
	}
]
const checkPathContainCurrentPath = (current: string, path: string) => {
	if (path === '/') return current === '/'

	return current.includes(path)
}

export const FooterMenu = () => {
	const { pathname: navigationPath } = useLocation()
	const appMode = useSelector((state: RootState) => state.app.mode)
	const isLoading = appMode === AppModes.Loaging
  
	return (
	  <AnimatedByPageLoading
		className={styles['footer']}
		style={{
		  pointerEvents: isLoading ? 'none' : 'all',
		}}
	  >
		<div
		  className={styles['footer__grid']}
		>
		  {FOOTER_LINKS.map((element) => (
			<NavLink
			  key={element.url}
			  to={element.disable ? undefined : element.url}
			  className={classNames(styles['footer-link'], {
				[styles['footer-link_circle']]: element.isCircle,
				[styles['footer-link_active']]: checkPathContainCurrentPath(navigationPath, element.url)
			})}
			>
				{element.image && <AnimSvg width={24} height={24}>
					{element.image}
				</AnimSvg>}
				<div className={classNames(styles['footer-link__title'], {
					[styles['footer-link__title_circle']]: element.isCircle,
					[styles['footer-link__title_active']]: checkPathContainCurrentPath(navigationPath, element.url)
				})}>
				  {element.name}
				</div>
				{element.isCircle && <AnimImg className={styles['footer-link__circle']} src={unionImgPath} />}
			</NavLink>
		  ))}
		</div>
		<AnimImg className={styles['footer-image']} src={footerBgImgPath}/>
	  </AnimatedByPageLoading>
	)
  }