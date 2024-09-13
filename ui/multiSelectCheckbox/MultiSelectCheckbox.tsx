import React, { useEffect, useState } from 'react'

import styles from './MultiSelectCheckbox.module.scss'
import DropDown from '../dropDown/DropDown'
import { useFilter } from '@/hooks/useFilter'
import SelectOption from './selectOption/SelectOption'

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
				key={option.label}
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
			return option.value.toLowerCase()
		})
		return arr
	}

	useEffect(() => {
		if (selectedOptions?.length > 0) {
			console.log('selectedOptions', selectedOptions)
			setFilmGenreName(handleFormatSelectedOptions(selectedOptions))
		}
	}, [selectedOptions?.length])

	return (
		<div className={styles['dropdown__flex']}>
			<div>
				{selectedOptions?.length > 0 && (
					<p className={styles['dropdown__label']}>
						<span>Выбрано: </span>
						<ul className={styles['dropdown__tabs']}>
							{selectedOptions.map((option: any) => {
								return (
									<li
										style={{
											border: '1px solid white',
											backgroundColor: 'transparent',
											padding: '1px 6px',
										}}>
										{option.label}
									</li>
								)
							})}
						</ul>
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
