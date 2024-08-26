'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'

import Button from '@/ui/button/Button'
import ArrowLeftIcon from '@/icons/ArrowLeftIcon'
import ArrowRightIcon from '@/icons/ArrowRightIcon'

import styles from './Pagination.module.scss'

import { IFetchMovieParams } from '@/types/interfaces'

const Pagination = ({
	totalPage,
	isPlaceholderData,
	limitHandler,
	params,
}: {
	totalPage: number
	isPlaceholderData: boolean
	params: number | string
	limitHandler: any
}) => {
	const searchParams = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()

	const currentPage = Number(searchParams.get('page')) ?? 1

	const prevPage = currentPage - 1

	const nextPage = currentPage + 1

	const handleAmount = (e: any) => {
		limitHandler(Number(e.target.value))
	}

	const handlePageChange = (newPage: number | string) => {
		const newSearchParams = new URLSearchParams(
			Array.from(searchParams.entries())
		)
		newSearchParams.set('page', String(newPage))
		router.push(`${pathname}?${newSearchParams}`)
	}

	const MAX_ITEM_PAGE = params.limit

	const hasPrev = MAX_ITEM_PAGE * (currentPage - 1) > 0
	const hasNext =
		MAX_ITEM_PAGE * (currentPage - 1) + MAX_ITEM_PAGE < totalPage

	return (
		<div className={styles['pagination']}>
			<select onChange={e => handleAmount(e)}>
				<option value='10'>10</option>
				<option value='15'>15</option>
				<option value='20'>20</option>
			</select>
			<Button
				onClick={() => handlePageChange(prevPage)}
				isDisabled={currentPage === 0}
				className={styles['pagination__btn']}>
				<ArrowLeftIcon
					fill='currentColor'
					width={'1em'}
					height={'1em'}
				/>
			</Button>
			<Button
				onClick={() => {
					if (!isPlaceholderData) {
						handlePageChange(nextPage)
					}
				}}
				isDisabled={currentPage === totalPage}
				className={styles['pagination__btn']}>
				<ArrowRightIcon
					fill='currentColor'
					width={'1em'}
					height={'1em'}
				/>
			</Button>
		</div>
	)
}

export default Pagination
