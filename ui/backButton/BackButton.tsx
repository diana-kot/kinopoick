'use client'

import React from 'react'
import Button from '../button/Button'

import { useRouter } from 'next/navigation'

const BackButton = () => {
	const router = useRouter()

	return <Button text='Назад' onClick={() => router.back()} />
}

export default BackButton
