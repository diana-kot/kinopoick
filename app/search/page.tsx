'use client'

import { getSearchResult } from '@/actions/movie'
import { QUERY_KEY } from '@/constants/queryKeys'
import { IFetchMovieParams } from '@/types/interfaces'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import SearchList from '@/components/search/searchList/SearchList'

import styles from './page.module.scss'
import Loader from '@/components/loader/Loader'

export default function Search() {
	const queryParams = useSearchParams()

	const [searchParams, setSearchParams] = useState<IFetchMovieParams>({
		page: 1,
		limit: 10,
		query: '',
	})

	useEffect(() => {
		setSearchParams(prev => ({
			...prev,
			query: queryParams.get('query') || '',
			page: 1,
		}))
	}, [queryParams])

	const fetchSearchResults = async ({ pageParam = 1 }) => {
		const { docs, total, pages } = await getSearchResult({
			...searchParams,
			page: pageParam,
		})

		return { docs, total, pages, currentPage: pageParam }
	}

	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		status,
	} = useInfiniteQuery({
		queryKey: [QUERY_KEY.search, searchParams.query],
		queryFn: fetchSearchResults,
		initialPageParam: 1,
		getNextPageParam: lastPage => {
			if (lastPage.currentPage < lastPage.pages) {
				return lastPage.currentPage + 1
			}
			return undefined
		},
		enabled: !!searchParams.query,
		refetchOnWindowFocus: false,
	})

	const loadMore = useCallback(() => {
		fetchNextPage()
	}, [fetchNextPage])

	const searchResult = data?.pages.flatMap(page => page.docs) || []
	const searchResultTotal = data?.pages[0]?.total || 0

	return (
		<div className={styles.search}>
			<h1 className={styles.search__title}>Результаты поиска</h1>
			{!searchParams.query && status !== 'pending' && (
				<p className={styles.search__empty}>Пустой поисковый запрос</p>
			)}

			{isFetching && !isFetchingNextPage && <Loader />}

			{error && (
				<p className={styles.search__empty}>
					Произошла ошибка при загрузке данных. Пожалуйста, попробуйте
					позже
				</p>
			)}

			{status !== 'pending' && !isFetching && searchResultTotal === 0 && (
				<p className={styles.search__empty}>
					По вашему запросу ничего не найдено
				</p>
			)}

			{searchResult.length > 0 && (
				<>
					<p className={styles.search__total}>
						Всего найдено: {searchResultTotal}
					</p>

					<SearchList
						searchResult={searchResult}
						isLoading={isFetchingNextPage}
						hasMore={hasNextPage}
						loadMore={loadMore}
					/>
				</>
			)}
		</div>
	)
}
