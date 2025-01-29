import { ReactNode } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import React, { FC, useEffect, useState } from 'react'

export const AnimSvg: FC<Omit<React.SVGProps<SVGSVGElement>, 'children'> & { containerClassnames?: string, children: ReactNode, height?: number, width?: number }> = ({
	children,
	containerClassnames = '',
	height = 'max-content',
	width = 'max-content',
	...props
}) => {
	const [imageLoading, setImageLoading] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			setImageLoading(false)
		}, 200)
	}, [])

	return (
		<motion.div
			initial={{ height, width, opacity: 0 }}
			animate={{
				opacity: imageLoading ? 0 : 1
			}}
			transition={{
				opacity: { delay: 0.1, duration: 0.2 }
			}}
		>
			{React.cloneElement(children, { ...props })}
		</motion.div>
	)
}
