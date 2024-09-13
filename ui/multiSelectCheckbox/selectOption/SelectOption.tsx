import React from 'react'

const SelectOption = (item: string) => {
	return (
		<div
			style={{
				border: '1px solid white',
				backgroundColor: 'transparent',
				padding: '10px',
			}}>
			{item}
		</div>
	)
}

export default SelectOption
