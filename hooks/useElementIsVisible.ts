import { useEffect, useState, useRef, RefObject } from 'react'

const useElementIsVisible = (ref: RefObject<HTMLElement>) => {
	const observerRef = useRef<IntersectionObserver>()
	const [isOnScreen, setIsOnScreen] = useState(false)

	useEffect(() => {
		observerRef.current = new IntersectionObserver(([entry]) =>
			setIsOnScreen(entry.isIntersecting)
		)
	}, [])

	useEffect(() => {
		//@ts-ignore
		observerRef.current?.observe(ref.current)

		return () => {
			observerRef.current?.disconnect()
		}
	}, [ref])

	return {
		isOnScreen,
	}
}

export default useElementIsVisible
