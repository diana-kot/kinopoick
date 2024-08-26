import React, { useCallback } from 'react'

import useDebouncedFunction from '@/hooks/useDebouncedFunction'
import RangeSlider from '@/ui/rangeSlider/RangeSlider'

interface IProps {
	state: number[]
	setState: React.Dispatch<React.SetStateAction<number[]>>
	minDist: number
	min: number
	max: number
	name: string
}

const DoubleRange = ({ state, setState, minDist, min, max, name }: IProps) => {
	const minDistance = minDist

	const changeValue = (newValue: any) => {
		setState(newValue)
	}

	const debouncedValueLogging = useDebouncedFunction(changeValue, 300)

	const handleRating = useCallback(
		(event: Event) => {
			if (!Array.isArray(event)) {
				return
			}
			debouncedValueLogging(event)
		},
		[setState, minDistance, min, max]
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
				onChange={handleRating}
				value={state}
			/>
		</div>
	)
}

export default DoubleRange
