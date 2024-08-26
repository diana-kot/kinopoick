import React from 'react'

import styles from './Button.module.scss'

interface Button {
	text?: string
	onClick?: () => void
	isDisabled?: boolean
	className?: string
	children?: React.ReactNode
}

const Button = ({ text, onClick, isDisabled, children, className }: Button) => {
	return (
		<button
			className={`
				${styles['button']} 
				${isDisabled && styles[`button_disabled`]}
				${className}
				`}
			onClick={onClick}
			disabled={isDisabled}>
			{text}
			{children}
		</button>
	)
}

export default Button
