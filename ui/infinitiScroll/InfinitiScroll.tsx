'use client'

import { useRef, useEffect } from 'react'

interface InfinitiScrollProps {
	hasMore: boolean
	loadMore: () => void
}

const InfinitiScroll = ({ hasMore, loadMore }: InfinitiScrollProps) => {
	const observerRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(([element]) => {
			if (element?.isIntersecting && hasMore) {
				loadMore()
			}
		})

		const currentRef = observerRef.current

		if (currentRef) {
			observer.observe(currentRef)
		}

		return () => {
			observer.disconnect()
		}
	}, [hasMore, loadMore])

	return <div ref={observerRef} />
}

export default InfinitiScroll
