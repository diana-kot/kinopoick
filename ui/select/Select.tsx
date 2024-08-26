import React from 'react'

import styles from './Select.module.scss'

interface IOptions {
	value: string
	label: string
}

export interface ISelectProps {
	onFocus?: () => void
	onBlur?: () => void
	onChange: (...event: any[]) => void
	options: IOptions[]
}

const Select = ({ onChange, onBlur, onFocus, options }: ISelectProps) => {
	return (
		<select
			onBlur={onBlur}
			onFocus={onFocus}
			onChange={onChange}
			className={styles.select}>
			{options.map(option => (
				<option
					key={option.label}
					className={styles.optionItem}
					value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	)
}

export default Select
