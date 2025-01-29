import { motion, Variants } from 'framer-motion'
import { ComponentProps, FC, memo } from 'react'

import { RootState } from '@/store'
import { AppModes } from '@/store/app'
import { useSelector } from 'react-redux'

type AnimatedByPageLoadingProps = ComponentProps<typeof motion.div> & {
	index?: number
	isBlockShow?: boolean
}

const VARIANTS: Variants = {
	open: {
		opacity: 1
	},
	closed: {
		opacity: 0
	}
}

const AnimatedByPageLoading: FC<AnimatedByPageLoadingProps> = ({
	index = 1,
	isBlockShow = false,
	initial = { opacity: 0 },
	children,
	...props
}) => {
	const appMode = useSelector((state: RootState) => state.app.mode)
	const isLoading = appMode === AppModes.Loaging

	return (
		<motion.div
			animate={isLoading ? 'closed' : 'open'}
			initial={initial}
			variants={VARIANTS}
			transition={{
				delay: 0.05 * index,
				duration: 0.3
			}}
			{...props}
		>
			{children}
		</motion.div>
	)
}

export default memo(AnimatedByPageLoading)
