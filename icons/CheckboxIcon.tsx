import React, { SVGProps } from 'react'

const CheckboxIcon = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			viewBox='0 0 10 8'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}>
			<path
				d='M1 3.88314L3 6L9 1'
				stroke-width='2'
				stroke-linecap='round'
			/>
		</svg>
	)
}

export default CheckboxIcon
