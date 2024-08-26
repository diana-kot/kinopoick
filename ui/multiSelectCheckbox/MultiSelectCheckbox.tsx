import React, { useEffect, useState } from 'react'

import styles from './MultiSelectCheckbox.module.scss'
import DropDown from '../dropDown/DropDown'
import { useFilter } from '@/hooks/useFilter'

type dropdownTypes =
	| 'select' //Select
	| 'dropdown' //Dropdown
	| 'multi' //Multi select

interface IMultiSelectCheckboxProps {
	optionsSelect: IOption[]
	value?: string
	label?: string
	type?: dropdownTypes
	className?: string
}

interface IOption {
	label: string
	value: string
	checked: boolean
}

const MultiSelectCheckbox = ({
	optionsSelect,
	value,
	type = 'select',
	label,
	className = '',
}: IMultiSelectCheckboxProps) => {
	const [options, setOptions] = useState<IOption[]>(optionsSelect)

	const { setFilmGenreName } = useFilter()

	const selectedOptions = options.filter(option => option.checked)

	const renderSelectItems = () => {
		return options.map(option => (
			<li
				className={styles['option']}
				key={option.value}
				onClick={e => e.stopPropagation()}>
				<label className={styles['label']}>
					<input
						type='checkbox'
						checked={option.checked}
						onChange={() => {
							const updatedOptions = options.map(opt =>
								opt.value === option.value
									? {
											...opt,
											checked: !opt.checked,
									  }
									: opt
							)
							setOptions(updatedOptions)
						}}
					/>
					{option.label}
				</label>
			</li>
		))
	}

	const handleFormatSelectedOptions = (options: IOption[]) => {
		const arr = options.map(option => {
			return option.label.toLowerCase()
		})
		return arr
	}

	useEffect(() => {
		if (selectedOptions?.length > 0) {
			setFilmGenreName(handleFormatSelectedOptions(selectedOptions))
		}
	}, [selectedOptions?.length])

	return (
		<div className={styles['dropdown__flex']}>
			<div>
				{selectedOptions?.length > 0 && (
					<p className={styles['dropdown__label']}>
						<span>Выбрано:</span>
						{selectedOptions
							.map((option: any) => option.label)
							.join(', ')}
					</p>
				)}
			</div>

			<DropDown type={type} label={label} count={selectedOptions.length}>
				<ul className={styles['dropdown__container']}>
					{renderSelectItems()}
				</ul>
			</DropDown>
		</div>
	)
}

export default MultiSelectCheckbox
