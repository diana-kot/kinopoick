'use client'

import React, { useEffect, useRef, useState } from 'react'

const arr = [1, 2, 3, 4, 5]

const Page = () => {
	const ref2 = useRef(null)
	const [show, setShow] = useState(true)

	const [array, setArray] = useState(arr)

	const callbackRef = element => {}

	const removeItem = () => {
		setArray(prev =>
			array.filter((item, index) => index !== prev.length - 1)
		)
	}

	return (
		<div>
			{array.map((item, index) => (
				<div onClick={removeItem} ref={callbackRef} key={index}>
					{item}
				</div>
			))}

			{show && (
				<div onClick={() => setShow(false)} ref={ref2}>
					ref2
				</div>
			)}
		</div>
	)
}

export default Page
