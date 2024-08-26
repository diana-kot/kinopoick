import CheckboxIcon from '@/icons/CheckboxIcon'
import React, { memo } from 'react'

import styles from './Checkbox.module.scss'

interface ICheckboxProps {
	className?: string
	id?: string
	label?: string
	isChecked?: any
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: React.FC<ICheckboxProps> = memo(
	({ className, id, label, isChecked, onChange }) => {
		return (
			<label
				className={`
      ${styles['checkbox']} 
      ${isChecked && styles[`checkbox__active`]}
      ${className}
      `}
				htmlFor={id}>
				<span
					className={`
      ${styles['checkbox__iner']} 
     
      `}>
					<CheckboxIcon
						fill='currentColor'
						width={'1em'}
						height={'1em'}
						className={`${styles['checkbox__icon']}`}
					/>
					<input
						checked={isChecked}
						id={id}
						name={label}
						type='checkbox'
						value={label}
						onChange={onChange}
					/>
				</span>
				{label && (
					<span className={`${styles['checkbox__label']}`}>
						{label}
					</span>
				)}
			</label>
		)
	}
)

export default Checkbox
