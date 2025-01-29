import { buttonPrimaryBgImgPath } from '@/assets'
import { ReactNode } from '@tanstack/react-router'
import classNames from 'classnames'
import React, { FC } from 'react'
import styles from './Button.module.scss'

export const Button: FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { containerClassnames?: string, children: ReactNode, height?: number, width?: number }> = ({
	children,
    className,
	containerClassnames = '',
	height = 'max-content',
	width = 'max-content',
	...props
}) => {

	return (
		<button {...props} className={classNames(styles['button'], className)} style={{backgroundImage: `url(${buttonPrimaryBgImgPath})`}}>
            {children}
        </button>
	)
}
