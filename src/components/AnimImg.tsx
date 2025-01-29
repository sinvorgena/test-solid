import { HTMLMotionProps, motion } from 'framer-motion';
import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { AppModes } from '../store/app';


export const AnimImg: FC<PropsWithChildren<HTMLMotionProps<'img'> & { src: string; skipLoading?: boolean }>> = ({
	src,
	skipLoading = false,
	...props
}) => {
	const appMode = useSelector((state: RootState) => state.app.mode)
	const isAppLoading = appMode === AppModes.Loaging
	const animate = skipLoading || !isAppLoading

	const [imageLoading, setImageLoading] = useState(true)
	const imageLoadingRef = useRef(imageLoading)

	useEffect(() => {
		imageLoadingRef.current = imageLoading
	}, [imageLoading])

	const imageLoaded = () => {
		setTimeout(() => setImageLoading(false), 200)
	}
	useEffect(() => {
		setTimeout(() => {
			if (!imageLoadingRef.current) return
			setImageLoading(false)
		}, 4000)
	}, [])

	return (
		<motion.img
			initial={{ opacity: 0 }}
			onLoad={imageLoaded}
			src={src}
			animate={{
				opacity: animate && !imageLoading ? 1 : 0
			}}
			transition={{
				opacity: { delay: 0.1, duration: 0.2 }
			}}
			{...props}
		/>
	)
}
