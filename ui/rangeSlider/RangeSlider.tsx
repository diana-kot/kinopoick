import Slider, { SliderTooltip } from 'rc-slider'
import 'rc-slider/assets/index.css'
import { memo } from 'react'

export interface IRangeSlider {
	value: number[] | undefined
	min?: number
	max?: number
	step?: number
	defaultValue?: number[]
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const RangeSlider = ({
	value,
	min,
	max,
	step,
	defaultValue,
	onChange,
}: IRangeSlider) => {
	return (
		<div style={{ width: 200 }}>
			<Slider
				min={min}
				max={max}
				step={step}
				range
				value={value}
				defaultValue={defaultValue}
				onChange={onChange}
			/>
		</div>
	)
}

export default memo(RangeSlider)
