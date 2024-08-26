import React, { useEffect, useState } from 'react'
import { useOutsideClick } from '@/hooks/useClickOutside'

import styles from './Dropdown.module.scss'

type dropdownTypes =
	| 'select' //Select
	| 'dropdown' //Dropdown
	| 'multi' //Multi select

interface IDropDownProps {
	children: React.ReactNode
	value?: string | number //Название выбора в шапке компонента
	label?: string | null //Лейбл компонента
	type?: dropdownTypes //Тип dropdown
	className?: string
	count?: number
}

const DropDown = ({
	children,
	label = '',
	value = 'Выберите значение',
	type = 'dropdown',
	className = '',
	count,
}: IDropDownProps) => {
	const [open, setOpen] = useState(false)
	const [dropdownValue, setDropdownValue] = useState(value)

	const closeDropdown = useOutsideClick(() => {
		setOpen(false)
	})

	const closeInnerDropdown = () => {
		if (type === 'select') {
			setOpen(false)
		}
	}

	const openHandler = () => {
		setOpen(!open)
	}

	useEffect(() => {
		setDropdownValue(value)
	}, [value])

	return (
		<div className={styles['dropdown__container']} ref={closeDropdown}>
			{label !== '' && (
				<span className={styles['dropdown__label']}>{label}</span>
			)}
			<div
				className={`${styles['dropdown__container-header']} ${className}`}
				onClick={openHandler}>
				<span className={styles['dropdown__container-title']}>
					{dropdownValue}
				</span>
				<span className={styles['dropdown__container-title']}>
					{count && count >= 1 ? `(${count})` : ''}
				</span>
				{/* <div
					className={
						open
							? styles['dropdown__container-arrow_open']
							: styles['dropdown__container-arrow']
					}>
					<ArrowDown />
				</div> */}
			</div>
			<div
				className={styles['dropdown__content']}
				style={{ display: open ? 'flex' : 'none' }}
				onClick={closeInnerDropdown}>
				{children}
			</div>
		</div>
	)
}

export default DropDown
