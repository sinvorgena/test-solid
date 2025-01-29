import { Link, LinkComponent, useNavigate } from '@tanstack/react-router'
import classNames from 'classnames'
import { MouseEventHandler } from 'react'
import styles from './NavLink.module.scss'

export const NavLink: LinkComponent<'a'> = ({ className, children, onClick = () => null, to }) => {
	const navigate = useNavigate()

	const handleClick: MouseEventHandler<'a'> = (e) => {
		e.preventDefault()
		onClick(e)
		typeof window.Telegram?.WebApp?.HapticFeedback?.impactOccurred === 'function' &&
			window.Telegram.WebApp.HapticFeedback.impactOccurred('light')

		navigate({ to })
	}

	
	return (
		<Link 
			className={classNames(styles['nav-link'], className)}
			onClick={handleClick}
		>
			{children}
		</Link>
	)
}
