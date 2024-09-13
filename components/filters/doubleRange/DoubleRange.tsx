import React, { useCallback } from 'react'

import useDebouncedFunction from '@/hooks/useDebouncedFunction'
import RangeSlider from '@/ui/rangeSlider/RangeSlider'
import { useFilter } from '@/hooks/useFilter'

interface IProps {
	state: number[]
	minDist: number
	min: number
	max: number
	name: string
}

const DoubleRange = ({ state, minDist, min, max, name }: IProps) => {

	const { setFilmRating } = useFilter()
	const minDistance = minDist

	const changeValue = (newValue: number[]) => {
		console.log('newValue', newValue)
		setFilmRating(newValue)
	}

	const debouncedValueLogging = useDebouncedFunction(changeValue, 300)

	const handleRating = useCallback(
		(event: Event) => {
			console.log('event', event)
			if (!Array.isArray(event)) {
				return
			}
			debouncedValueLogging(event)
		},
		[setFilmRating, minDistance, min, max]
	)

	return (
		<div>
			<p>{name}</p>
			<span>
				от {state[0]} до {state[1]}
			</span>
			<RangeSlider
				trackStyle={{ backgroundColor: 'black', height: 10 }}
				railStyle={{ backgroundColor: 'lightblue', height: 10 }}
				handleStyle={{
					borderColor: 'red',
					height: 20,
					width: 20,
					marginLeft: -10,
					marginTop: -5,
					backgroundColor: 'red',
				}}
				min={min}
				max={max}
				step={minDist}
				defaultValue={state}
				onChange={(e) => handleRating(e)}
				value={state}
			/>
		</div>
	)
}

export default DoubleRange
